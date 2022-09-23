import { ErrorInterface } from "../../controllers/error";
import { SuccessInterface } from "../../interfaces/success.interface";
import { App } from "../../agile";
import { State } from "@agile-ts/core";

// Interfaces
export interface EditorInterface<DataType = { [key: string]: any }> {
  data: DataType;
  onSubmit: (
    preparedData: any,
    settings: object
  ) => Promise<
    | ErrorInterface
    | SuccessInterface
    | null
    | { return: null | SuccessInterface; reset: boolean }
  >;
  fixedProperties: string[];
  editableProperties: string[];
  validateMethods: DataObject<() => Promise<boolean>>;
}

interface PropertyStatus {
  message: string;
  type: StatusType;
}

interface EditorStatus {
  isModified: boolean;
  isValid: boolean;
}

// A Row in an Object Type
type DataObject<V = any> = { [key: string]: V };

// Status Types
type StatusType = "error" | "success";

export class Editor {
  // Constructor
  constructor(public editable: EditorInterface) {
    this.editable = editable;

    // Loop trough data and check if it is fixed or it is always included
    for (let property in editable.data) {
      // Ignore not editable properties
      if (!editable.editableProperties.includes(property)) continue;

      // Add property to Editable KeyMap
      this.editableKeyMap[property] = 0;
    }
  }

  // The edited Properties (Note not all properties can be edited in here)
  public editedData = App.State<DataObject>(this.editable.data);

  // KeyMap with the editable Properties
  public editableKeyMap: DataObject<number> = {};

  // The initial Properties
  public originalData = App.State<DataObject>(this.editable.data);

  // The edited Properties which will be return as data in the submit method (Note: fixed properties are always in here)
  public preparedData = App.State<DataObject>({});

  // The Properties which has an Status
  public propertiesWithStatus: State<DataObject<PropertyStatus>> = App.State(
    {}
  );

  // Status of the Editor
  private _status = App.State<EditorStatus>({
    isModified: false,
    isValid: true
  });

  //======================================================================================================================
  // Status
  //======================================================================================================================

  public get status(): EditorStatus {
    return this._status.value;
  }

  //======================================================================================================================
  // Dependencies
  //======================================================================================================================

  // Get the reactive Dependencies (Use 'usePulse(editor.dependencies)' for making the Editor reactive)
  public get dependencies() {
    return [
      this.preparedData,
      this.propertiesWithStatus,
      this._status,
      this.editedData,
      this.originalData
    ];
  }

  //======================================================================================================================
  // Reset
  //======================================================================================================================

  public reset() {
    // Reset Edited Data
    for (let property in this.editableKeyMap)
      this.editedData.value[property] = this.originalData.value[property];

    this._status.reset();
    this.propertiesWithStatus.reset();
    this.preparedData.reset();
  }

  //======================================================================================================================
  // Update Original Value
  //======================================================================================================================

  public updateOriginValue(object: any) {
    for (let property in object) {
      // Update OriginalData
      if (this.originalData.value[property] !== undefined) {
        // Otherwise it won't cause a rerender (For instance the editedData below won't cause a rerender)
        const _originalData = this.originalData.value;
        _originalData[property] = object[property];
        this.originalData.set(_originalData);
      }

      // Update EditedData
      if (this.editedData.value[property] !== undefined) {
        this.editedData.value[property] = object[property];

        // Remove it from prepared
        this.removeFromPrepared(property);
      }

      // Update FixedProperties
      if (this.editable.fixedProperties.includes(property)) {
        this.preparedData.value[property] = object[property];
      }
    }
  }

  //======================================================================================================================
  // Submit
  //======================================================================================================================

  public async submit(
    settings?: object
  ): Promise<ErrorInterface | SuccessInterface | null> {
    // Validate the Editor
    const isValid = await this.validateEditor();

    // Create Input error if Editor is not valid (Note: use getError, getMessage, to get the specific message.. this is only a general error)
    if (!isValid)
      return {
        error: {
          message: "Input isn't valid!",
          type: "input",
          e: null
        }
      };

    // Call on Submit
    const onSubmitResponse = await this.editable.onSubmit(
      this.preparedData.value,
      settings || {}
    );
    if (onSubmitResponse !== null && "error" in onSubmitResponse)
      return onSubmitResponse;

    const hasResetProperty: boolean =
      onSubmitResponse !== null && "reset" in onSubmitResponse;

    // Reset Editor
    // @ts-ignore
    if (hasResetProperty ? onSubmitResponse.reset : true) this.reset();

    // @ts-ignore
    return hasResetProperty ? onSubmitResponse.return : onSubmitResponse;
  }

  //======================================================================================================================
  // Property Exists
  //======================================================================================================================

  public propertyExists(property: string) {
    for (let p in this.editedData.value) {
      if (p === property) return true;
    }
    return false;
  }

  //======================================================================================================================
  // Get Value
  //======================================================================================================================

  public getValue(property: string) {
    // Check if property exists
    if (!this.propertyExists(property)) {
      console.error(`${property} does not exists!`);
      return;
    }

    // Return Value
    const value = this.editedData.value[property];
    return Array.isArray(value) ? [...value] : value;
  }

  //======================================================================================================================
  // Get Original Value
  //======================================================================================================================

  public getOriginalValue(property: string) {
    // Check if property exists
    if (!this.originalData.value.hasOwnProperty(property)) {
      console.error(`${property} does not exists!`);
      return;
    }

    // Return Original Value
    return this.originalData.value[property];
  }

  //======================================================================================================================
  // Set Value
  //======================================================================================================================

  public setValue(property: string, value: any) {
    // Return if value isn't editable
    if (!this.editable.editableProperties.includes(property)) return;

    // Change
    const change = { [property]: value };

    // Update Edited Data
    const _editedData = this.editedData.value;
    _editedData[property] = value;
    this.editedData.set(_editedData);

    // Check if new value is different to the original
    if (this.evaluateChanges(property, value)) {
      // Update PreparedData
      this.setPrepared(change);
    } else {
      // Remove from Prepared
      this.removeFromPrepared(property);
    }

    // Checks if all values are valid
    this.validateEditor();

    // Update IsModified
    this.updateIsModified();
  }

  //======================================================================================================================
  // Reset Value
  //======================================================================================================================

  public resetValue(property: string) {
    this.setValue(property, this.originalData.value[property]);
  }

  //======================================================================================================================
  // Update Is Modified
  //======================================================================================================================

  private updateIsModified() {
    // Check the length of prepared properties is larger than only the fixedProperties which are preparedValues as default
    let newKeys = Object.keys(this.preparedData.value).length;
    let currentKeys = this.editable.fixedProperties.length;
    if (newKeys > currentKeys) {
      this._status.patch({ isModified: true });
    } else {
      this._status.patch({ isModified: false });
    }
  }

  //======================================================================================================================
  // Is Modified
  //======================================================================================================================

  public isModified(properties: string[]): boolean {
    let _isModified = false;
    for (let i = 0; i < properties.length; i++) {
      // Check if property exists
      if (this.editableKeyMap[properties[i]] === undefined) continue;

      _isModified =
        _isModified ||
        this.editedData.value[properties[i]] !==
          this.originalData.value[properties[i]];
    }
    return _isModified;
  }

  //======================================================================================================================
  // Remove From Prepared
  //======================================================================================================================

  private removeFromPrepared(property: string) {
    // If fixed Property return
    if (this.editable.fixedProperties.includes(property)) return;

    // Copy PreparedData
    let copiedPreparedData = this.preparedData.copy();

    // Delete data at the position of property
    delete copiedPreparedData[property];

    // Reset Status of property
    this.resetStatus(property);

    // Update Prepared
    this.setPrepared(copiedPreparedData, true);
  }

  //======================================================================================================================
  // Set Prepared
  //======================================================================================================================

  private setPrepared(object: DataObject<any>, overwrite: boolean = false) {
    // Add fixedProperties to the object.. because fixedProperties are always in prepared
    for (let i in this.editable.fixedProperties) {
      let property = this.editable.fixedProperties[i];

      // Check if property is already in PreparedData.. if not add it to the object.. and patch it into prepared data
      if (!this.preparedData.value.hasOwnProperty(property))
        object[property] = this.originalData.value[property];
    }

    // Update Prepared (Note I am not using the patch function.. because it also does merge arrays..)
    let newPreparedData = overwrite ? object : this.preparedData.copy();
    if (!overwrite) {
      for (let property in object) {
        newPreparedData[property] = object[property];
      }
    }

    this.preparedData.set(newPreparedData);
  }

  //======================================================================================================================
  // Validate
  // Check if the property is Valid
  //======================================================================================================================

  public async validate(property: string, value: any): Promise<boolean> {
    /* Not sure if that is useful..
        // If the property is the same as the original.. than it should be valid..
        if (this.originalData[property] === value && this.originalData[property] !== '') {
            this.resetStatus(property);
            return true;
        }
         */

    // Run validate async method and return result as boolean
    if (this.editable.validateMethods[property])
      return await this.editable.validateMethods[property]();
    else return true;
  }

  //======================================================================================================================
  // Validate Editor
  //======================================================================================================================

  public async validateEditor(): Promise<boolean> {
    let isValid = true;

    // Check if all properties are valid
    for (let property in this.editableKeyMap)
      isValid =
        (await this.validate(property, this.editedData.value[property])) &&
        isValid; // Note isValid behind the validate!! otherwise it will only validate until some value is false

    // Update Status
    this._status.patch({ isValid: isValid });

    return isValid;
  }

  //======================================================================================================================
  // Set Status (success, error)
  //======================================================================================================================

  public setStatus(property: string, type: StatusType, message: string) {
    // Add property to properties With Status
    this.propertiesWithStatus.patch({
      [property]: {
        type,
        message
      }
    });
  }

  //======================================================================================================================
  // Reset Status
  //======================================================================================================================

  public resetStatus(property: string) {
    // Copy Properties With Status
    const copiedPropertiesWithStatus = this.propertiesWithStatus.copy();

    // Delete Property with Status
    delete copiedPropertiesWithStatus[property];

    // Update Properties With Status
    this.propertiesWithStatus.set(copiedPropertiesWithStatus);
  }

  //======================================================================================================================
  // Get Success Status
  //======================================================================================================================

  public getSuccessStatus(property: string): boolean {
    // Check if property exists in properties With Status
    if (!this.propertiesWithStatus.value.hasOwnProperty(property)) return false;

    return this.propertiesWithStatus.value[property].type === "success";
  }

  //======================================================================================================================
  // Get Error Status
  //======================================================================================================================

  public getErrorStatus(property: string): boolean {
    // Check if property exists in properties With Status
    if (!this.propertiesWithStatus.value.hasOwnProperty(property)) return false;

    return this.propertiesWithStatus.value[property].type === "error";
  }

  //======================================================================================================================
  // Get Status Message
  //======================================================================================================================

  public getStatusMessage(property: string): string | false {
    // Check if property exists in properties With Status
    if (!this.propertiesWithStatus.value.hasOwnProperty(property)) return false;

    return this.propertiesWithStatus.value[property].message;
  }

  //======================================================================================================================
  // Evaluate Changes
  //======================================================================================================================

  // Check if new value is different to the original
  private evaluateChanges(property: string, value: any): boolean {
    return this.originalData.value[property] !== value;
  }
}

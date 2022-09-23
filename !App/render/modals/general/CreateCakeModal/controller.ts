import core from "../../../../src/core";
import strings from "./strings";
import { CakeInterface } from "../../../../src/core/controllers/cake/cake.interface";
import { ImageInterface } from "../../../../src/core/controllers/image/image.interface";

//======================================================================================================================
// Set Cake Editor Values
//======================================================================================================================

export const setCakeEditorValues = (
  cakeId: string | null,
  cake: CakeInterface | undefined,
  defaultCakeImage: ImageInterface | undefined
) => {
  if (!cakeId || !cake) return;

  // Update Original Values
  CakeEditor.updateOriginValue({
    id: cake.id,
    name:
      cake.cakeData.product.name === core.cake.randomCakeKey
        ? strings().randomCakeTitle
        : cake.cakeData.product.name,
    description: "",
    images: defaultCakeImage ? [defaultCakeImage] : [],
  });
};

//======================================================================================================================
// Cake Editor
//======================================================================================================================

export const CakeEditor = new core.helper.editor.Editor({
  data: {
    id: "",
    name: "",
    description: "",
    images: [],
  },
  onSubmit: async (data: any) => {
    // Bring Cake Event Data
    const name: string = data.name || "unknown";
    const description: string = data.description || "unknown";
    const images: ImageInterface[] =
      data.images || CakeEditor.getOriginalValue("images");

    // Bring Cake Event
    const bringCakeResponse = await core.member.bringCake(
      data.id,
      images,
      description,
      name
    );
    if (bringCakeResponse !== null && "error" in bringCakeResponse)
      return bringCakeResponse;

    return {
      success: {
        title: strings().submitCakeSuccessTitle,
        message: strings().submitCakeSuccessText,
      },
    };
  },
  fixedProperties: ["id", "name", "description", "images"],
  validateMethods: {
    name: async () => {
      const value: string = CakeEditor.getValue("name");

      if (value.length < 2) {
        CakeEditor.setStatus("name", "error", strings().nameIsToShortError);
        return false;
      }

      CakeEditor.resetStatus("name");
      return true;
    },
    description: async () => {
      const value: string = CakeEditor.getValue("description");

      if (value.length < 4) {
        CakeEditor.setStatus(
          "description",
          "error",
          strings().descriptionIsToShortError
        );
        return false;
      }

      CakeEditor.resetStatus("description");
      return true;
    },
    images: async () => {
      const value: string = CakeEditor.getValue("images");

      if (value.length < 1) {
        CakeEditor.setStatus("images", "error", strings().noImagesError);
        return false;
      }

      CakeEditor.resetStatus("images");
      return true;
    },
  },
  editableProperties: ["description", "name", "images"],
});

//======================================================================================================================
// Add Image
//======================================================================================================================

export const addImage = (image: ImageInterface) => {
  const images: ImageInterface[] = CakeEditor.getValue("images");
  images.push(image);
  CakeEditor.setValue("images", images);
};

//======================================================================================================================
// Remove Image
//======================================================================================================================

export const removeImage = (id: string) => {
  const images: ImageInterface[] = CakeEditor.getValue("images");
  const newImages = images.filter((image) => image.id !== id);
  CakeEditor.setValue("images", newImages);
};

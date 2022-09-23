import DropdownAlert from "react-native-dropdownalert";

export class DropDownHolder {
  static dropDown: DropdownAlert | null;

  static setDropDown(dropDown: DropdownAlert | null) {
    this.dropDown = dropDown;
  }

  static get getDropDown() {
    return this.dropDown;
  }
}

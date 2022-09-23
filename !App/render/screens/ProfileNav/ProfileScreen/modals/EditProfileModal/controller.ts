import { MultiEditor } from "@agile-ts/multieditor";
import { ErrorInterface } from "../../../../../../src/core/controllers/error/error.interface";
import { SuccessInterface } from "../../../../../../src/core/interfaces/success.interface";
import core from "../../../../../../src/core";
import strings from "../../strings";

export const ExtraProfileEditor = new MultiEditor<
  any,
  ErrorInterface | SuccessInterface
>((editor) => ({
  data: {
    id: "",
    name: "",
    description: "",
  },
  onSubmit: async (preparedData) => {
    for (let key in preparedData) {
      // Submit Name
      if (key === "name") {
        const nameResponse = await core.user.setUserName(
          preparedData.id,
          preparedData[key]
        );
        if ("error" in nameResponse) return nameResponse;

        // Update OriginValue
        editor.updateInitialValue(key, preparedData[key]);
      }

      // Submit Description
      if (key === "description") {
        const descriptionResponse = await core.user.setUserDescription(
          preparedData.id,
          preparedData[key]
        );
        if ("error" in descriptionResponse) return descriptionResponse;

        // Update OriginValue
        editor.updateInitialValue(key, preparedData[key]);
      }
    }

    return {
      success: {
        title: strings().updatedProfileSuccessTitle,
        message: strings().updatedProfileSuccessText,
      },
    };
  },
  validateMethods: {
    name: editor.Validator().required().string().min(2).max(10),
    description: editor.Validator().required().string().min(5).max(5000),
  },
  editableProperties: ["description", "name"],
  fixedProperties: ["id"],
  reValidateMode: "afterFirstSubmit",
}));

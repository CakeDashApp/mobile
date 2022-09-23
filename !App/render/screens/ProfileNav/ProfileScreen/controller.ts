import core from "../../../../src/core";
import * as alerts from "./alerts";
import strings from "./strings";
import { SuccessInterface } from "../../../../src/core/interfaces/success.interface";
import { ErrorInterface } from "../../../../src/core/controllers/error/error.interface";
import { MultiEditor } from "@agile-ts/multieditor";

export const ProfileEditor = new MultiEditor<
  any,
  ErrorInterface | SuccessInterface
>((editor) => ({
  data: {
    id: "",
    image: null,
  },
  onSubmit: async (preparedData) => {
    for (let key in preparedData) {
      // Submit Image
      if (key === "image") {
        const imageResponse = await core.user.setUserImage(
          preparedData.id,
          preparedData[key]
        );
        if ("error" in imageResponse) return imageResponse;

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
  editableProperties: ["image"],
  fixedProperties: ["id"],
  reValidateMode: "afterFirstSubmit",
}));

export const logoutAction = async (): Promise<
  ErrorInterface | SuccessInterface | null
> => {
  // Alert
  const alertResponse: "YES" | "NO" = await alerts.logoutAlert();

  // SignOut
  if (alertResponse === "YES") {
    const logoutResponse = await core.auth.signOut();
    return (
      logoutResponse || {
        success: {
          title: strings().logoutSuccessTitle,
          message: strings().logoutSuccessText,
        },
      }
    );
  }

  return null;
};

export const deleteAccountAction = async (): Promise<
  ErrorInterface | SuccessInterface | null
> => {
  // Alert
  const alertResponse: "YES" | "NO" = await alerts.deleteAccountAlert();

  // Delete User
  if (alertResponse === "YES") {
    const deleteAccountResponse = await core.auth.deleteUser();
    return (
      deleteAccountResponse || {
        success: {
          title: strings().deleteAccountSuccessTitle,
          message: strings().deleteAccountSuccessText,
        },
      }
    );
  }

  return null;
};

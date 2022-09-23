import core from "../../../../src/core";
import * as alerts from "./alerts";
import strings from "./strings";
import { SuccessInterface } from "../../../../src/core/interfaces/success.interface";
import { ErrorInterface } from "../../../../src/core/controllers/error/error.interface";
import MultiEditor, { Validator } from "@agile-ts/multieditor";

const emailValidator = new Validator()
  .required()
  .string()
  .email(strings().emailIsNotValidError);
const passwordValidator = new Validator()
  .required()
  .string()
  .min(5, strings().passwordIsToShortError)
  .matches(/\d/, "Password has to contain Numbers!");

export const SignInEditor = new MultiEditor<string, ErrorInterface | null>(
  (multiEditor) => ({
    data: {
      email: "",
      password: "",
    },
    onSubmit: async (preparedData) =>
      core.auth.signIn(preparedData.email, preparedData.password),
    fixedProperties: ["email", "password"],
    validateMethods: {
      email: emailValidator,
      password: passwordValidator,
    },
    reValidateMode: "afterFirstSubmit",
  })
);

//======================================================================================================================
// Sign Up Editor
//======================================================================================================================

export const SignUpEditor = new MultiEditor<string, ErrorInterface | null>(
  (multiEditor) => ({
    data: {
      email: "",
      password: "",
      name: "",
    },
    onSubmit: async (preparedData) =>
      core.auth.signUp(
        preparedData.email,
        preparedData.password,
        preparedData.name
      ),
    fixedProperties: ["email", "password", "name"],
    validateMethods: {
      email: emailValidator,
      password: passwordValidator,
      name: multiEditor.Validator().required().string().min(2),
    },
    reValidateMode: "afterFirstSubmit",
  })
);

//======================================================================================================================
// Forgot Password Action
//======================================================================================================================

export const resetPasswordAction = async (): Promise<
  ErrorInterface | SuccessInterface | null
> => {
  // Check if email is valid
  const email = SignInEditor.getValueById("email");
  const emailIsValid = await SignInEditor.getItemById("email")?.isValid;
  if (emailIsValid && email) {
    // Alert
    const alertResponse: "YES" | "NO" = await alerts.resetPasswordAlert();
    if (alertResponse === "YES") {
      // Reset Password
      const resetPasswordResponse = await core.auth.resetPassword(email);
      return (
        resetPasswordResponse || {
          success: {
            title: strings().sendResetPasswordEmailSuccessTitle,
            message: strings().sendResetPasswordEmailSuccessText,
          },
        }
      );
    }
  } else
    return {
      error: {
        type: "input",
        message: strings().emailIsNotValidError,
        e: null,
      },
    };

  return null;
};

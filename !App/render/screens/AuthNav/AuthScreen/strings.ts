import core from "../../../../src/core";

// Interface
interface StringsInterface {
  signUpHeaderText: string;
  signInHeaderText: string;
  signUpButtonText: string;
  signInButtonText: string;
  signInSwitchButtonText: string;
  signUpSwitchButtonText: string;
  nameInputText: string;
  emailInputText: string;
  passwordInputText: string;
  forgotPasswordButtonText: string;
  resetPasswordAlertTitle: string;
  resetPasswordAlertText: string;
  yesButtonText: string;
  noButtonText: string;
  emailIsNotValidError: string;
  passwordIsToShortError: string;
  nameIsToShortError: string;
  sendResetPasswordEmailSuccessTitle: string;
  sendResetPasswordEmailSuccessText: string;
}

// Strings
const strings: { en: StringsInterface; de: StringsInterface } = {
  en: {
    signUpHeaderText: "Are you Ready?",
    signInHeaderText: "Welcome Back!",

    // Input
    nameInputText: "Name",
    emailInputText: "E-Mail",
    passwordInputText: "Password",

    // Alerts
    resetPasswordAlertTitle: "Are you sure?",
    resetPasswordAlertText:
      "We will send you an Email, on which you can reset your password!",

    // Button
    yesButtonText: "Yes",
    noButtonText: "No",
    forgotPasswordButtonText: "Forgot Password?",
    signUpButtonText: "Sign Up",
    signInButtonText: "Sign In",
    signInSwitchButtonText: "Switch to Sign In",
    signUpSwitchButtonText: "Switch to Sign Up",

    // Errors
    emailIsNotValidError: "Email isn't valid!",
    passwordIsToShortError: "Password is to short!",
    nameIsToShortError: "Name is to short!",

    // Drop Downs
    sendResetPasswordEmailSuccessTitle: "Success",
    sendResetPasswordEmailSuccessText:
      "We successfully send you an Email, where you can reset your password!",
  },
  de: {
    signUpHeaderText: "Bist du bereit?",
    signInHeaderText: "Willkommen zurück!",

    // Input
    nameInputText: "Name",
    emailInputText: "E-Mail",
    passwordInputText: "Passwort",

    // Alerts
    resetPasswordAlertTitle: "Bist du dir sicher?",
    resetPasswordAlertText:
      "Wir werden dir eine Email senden, bei welcher du dein Passwort ändern kannst!",

    // Button
    yesButtonText: "Ja",
    noButtonText: "Nein",
    forgotPasswordButtonText: "Passwort vergessen?",
    signUpButtonText: "Sign Up",
    signInButtonText: "Sign In",
    signInSwitchButtonText: "Wechsel zu Sign In",
    signUpSwitchButtonText: "Wechsel zu Sign Up",

    // Error
    emailIsNotValidError: "Email ist nicht valid!",
    passwordIsToShortError: "Passwort ist zu kurz!",
    nameIsToShortError: "Name ist zu kurz!",

    // DropDown
    sendResetPasswordEmailSuccessTitle: "Erfolg",
    sendResetPasswordEmailSuccessText:
      "Wir haben dir erfolgreich eine Email gesendet, wo du dein Passwort zurücksetzten kannst!",
  },
};

export default function () {
  return strings[core.other.LANGUAGE.value] || strings.en;
}

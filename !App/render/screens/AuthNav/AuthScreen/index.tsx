import React, {useCallback, useContext, useEffect, useState} from "react";
import BackgroundView from "./components/BackgroundView";
import { useNavigation, useRoute } from "@react-navigation/native";
import Headerbar from "../../../../navigation/components/Headerbar";
import strings from "./strings";
import core from "../../../../src/core";
import SignInView from "./components/SignInView";
import * as controller from "./controller";
import CDismissKeyboard from "../../../components/default/cDismissKeyboard";
import SignUpView from "./components/SignUpView";
import { DropDownHolder } from "../../../components/project/DropDownHolder";
import { useAgile } from "@agile-ts/react";
import ThemeContext from "../../../../context/ThemeContext";

interface Props {}

const AuthScreen: React.FC<Props> = (props) => {
  // Theme
  const theme = useContext(ThemeContext);

  // Navigation
  const navigation = useNavigation();
  const route = useRoute();
  const goToTabs = () => navigation.navigate("Tabs");

  // Default
  const [showInputError, setShowInputError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Sign In
  const signIn: boolean = route.params?.signIn || false;
  const [isSignIn, setIsSignIn] = useState<boolean>(signIn);

  // Does hide the modal.. after switching to the tabNav
  const [show, setShow] = useState<boolean>(true);

  // Email
  const email = useAgile(core.auth.EMAIL);

  //======================================================================================================================
  // Header
  //======================================================================================================================

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: (props: any) => {
        return (
          <Headerbar
            {...props}
            title={
              isSignIn ? strings().signInHeaderText : strings().signUpHeaderText
            }
            color={theme.colors.on_primary}
            absolute
          />
        );
      },
    });
  }, [isSignIn]);

  //======================================================================================================================
  // Set Values of Editor
  // Why replacing the original values?
  // Because I can't load the email in the controller.. because the controller get loaded at the start of the !App and there the email doesn't exist yet -> error
  //======================================================================================================================

  useEffect(() => {
    controller.SignInEditor.updateInitialValue("email", email);
  }, [email]);

  //======================================================================================================================
  // On SignIn
  //======================================================================================================================

  const onSignIn = useCallback(async () => {
    setIsLoading(true);

    // Submit Editor
    const signInResponse = await controller.SignInEditor.submit();

    if (signInResponse && "error" in signInResponse) {
      // Drop Down Error
      DropDownHolder.dropDown?.alertWithType(
        "error",
        "Error",
        signInResponse.error.message
      );
      setShowInputError(signInResponse.error.type === "input");
    }

    if (signInResponse === null) {
      controller.SignInEditor.reset();
      setShow(false);
      goToTabs();
    }

    setIsLoading(false);
  }, [controller.SignInEditor]);

  //======================================================================================================================
  // On SignUp
  //======================================================================================================================

  const onSignUp = useCallback(async () => {
    setIsLoading(true);

    // Submit Editor
    const signUpResponse = await controller.SignUpEditor.submit();

    if (signUpResponse && "error" in signUpResponse) {
      // Drop Down Error
      DropDownHolder.dropDown?.alertWithType(
        "error",
        "Error",
        signUpResponse.error.message
      );
      setShowInputError(signUpResponse.error.type === "input");
    }

    if (signUpResponse === null) {
      controller.SignUpEditor.reset();
      setShow(false);
      goToTabs();
    }

    setIsLoading(false);
  }, [controller.SignUpEditor]);

  //======================================================================================================================
  // On Switch
  //======================================================================================================================

  const onSwitch = useCallback(() => {
    // Reset Form
    setShowInputError(false);
    controller.SignUpEditor.reset();
    controller.SignInEditor.reset();

    setIsSignIn(!isSignIn);
  }, [isSignIn]);

  //======================================================================================================================
  // On Forgot Password
  //======================================================================================================================

  const onForgotPassword = useCallback(async () => {
    // Reset Password
    const resetPasswordResponse = await controller.resetPasswordAction();

    // Error Drop Down
    if (resetPasswordResponse !== null && "error" in resetPasswordResponse)
      DropDownHolder.dropDown?.alertWithType(
        "error",
        "Error",
        resetPasswordResponse.error.message
      );

    // Success Drop Down
    if (resetPasswordResponse !== null && "success" in resetPasswordResponse)
      DropDownHolder.dropDown?.alertWithType(
        "success",
        resetPasswordResponse.success.title || "Success",
        resetPasswordResponse.success.message
      );
  }, [controller.SignInEditor]);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <CDismissKeyboard>
      <BackgroundView />
      <SignInView
        show={isSignIn && show}
        showInputError={showInputError}
        isLoading={isLoading}
        onForgotPassword={onForgotPassword}
        onSignIn={onSignIn}
        onSwitch={onSwitch}
      />
      <SignUpView
        show={!isSignIn && show}
        showInputError={showInputError}
        isLoading={isLoading}
        onSignUp={onSignUp}
        onSwitch={onSwitch}
      />
    </CDismissKeyboard>
  );
};

export default AuthScreen;

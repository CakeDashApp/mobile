import React, { useEffect, useRef, useState } from "react";
import { Animated } from "react-native";
import CBottomView from "../../../../../components/project/cBottomView";
import * as controller from "../../controller";
import core from "../../../../../../src/core";
import PrimaryButton from "../PrimaryButton";
import SecondaryButton from "../SecondaryButton";
import styled from "styled-components/native";
import strings from "../../strings";
import EmailInput from "./components/EmailInput";
import PasswordInput from "./components/PasswordInput";
import ForgotPasswordButton from "./components/ForgotPasswordButton";
import { useAgile } from "@agile-ts/react";

interface Props {
  show: boolean;
  showInputError: boolean;
  isLoading: boolean;
  onSignIn: () => void;
  onSwitch: () => void;
  onForgotPassword: () => void;
}

const SignInView: React.FC<Props> = (props) => {
  // Props
  const {
    show,
    showInputError,
    onSignIn,
    onSwitch,
    isLoading,
    onForgotPassword,
  } = props;

  // Keyboard
  const keyboardIsVisible = useAgile(core.ui.KEYBOARD_IS_VISIBLE);
  const keyBoardHeight = useAgile(core.ui.KEYBOARD_HEIGHT);

  // Animation
  const [isInAnimation, setIsInAnimation] = useState<boolean>(false);

  // Make From Reactive
  useAgile(controller.SignInEditor.deps);

  //======================================================================================================================
  // Animation
  //======================================================================================================================

  // Input Animation
  const inputAnimation = useRef(new Animated.Value(0)).current;

  const moveUp = () => {
    Animated.timing(inputAnimation, {
      toValue: 1,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  const moveDown = () => {
    Animated.timing(inputAnimation, {
      toValue: 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  const paddingAnimation = inputAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, keyBoardHeight],
  });

  useEffect(() => {
    if (keyboardIsVisible) moveUp();
    else moveDown();
  }, [keyboardIsVisible]);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <SignInViewContainer
      show={show}
      startAnimation={() => setIsInAnimation(true)}
      endAnimation={() => setIsInAnimation(false)}
    >
      <Animated.View style={{ paddingBottom: paddingAnimation }}>
        <InputContainer>
          <EmailInput />
          <PasswordInput />
          <ForgotPasswordButton onPress={onForgotPassword} />
        </InputContainer>
        <ButtonContainer>
          <PrimaryButton
            label={strings().signInButtonText}
            onPress={onSignIn}
            isLoading={isLoading}
            disabled={isInAnimation}
          />
          {!keyboardIsVisible && (
            <SecondaryButton
              label={strings().signUpSwitchButtonText}
              onPress={onSwitch}
              disabled={isInAnimation}
            />
          )}
        </ButtonContainer>
      </Animated.View>
    </SignInViewContainer>
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const ButtonContainer = styled.View`
  margin-bottom: 10px;
`;

const SignInViewContainer = styled(CBottomView)`
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 20px;
`;

const InputContainer = styled.View`
  margin-bottom: 20px;
`;

export default SignInView;

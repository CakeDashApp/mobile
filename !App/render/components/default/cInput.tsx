import React, {
  cloneElement,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Animated,
  TextInputProps,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";
import CIcon from "../../../assets/icons/cIcon";
import * as Animatable from "react-native-animatable";
import CText from "./cText";

interface Props {
  // Input
  initialValue?: string;
  onValueUpdate: (value: string) => void;
  password?: boolean;
  multiline?: boolean;
  value?: string;
  textInput?: TextInputProps;
  reset?: boolean;
  maxLength?: number;

  // Design
  title?: string;
  leftElement?: ReactElement;

  // Status
  error?: boolean;
  success?: boolean;
  statusMessage?: string | false;
  showError?: boolean;

  // Color
  color?: {
    changedColor?: string;
    inactiveColor?: string;
    activeColor?: string;
    errorColor?: string;
    successColor?: string;
    backgroundColor?: string;
    inputColor?: string;
  };

  // Listener
  onFocus?: () => void;
  onBlur?: () => void;

  // Clear
  clearable?: boolean;
  onClear?: () => void;

  // Style
  style?: object;
}

const CInput: React.FC<Props> = (props) => {
  // Props
  const {
    title,
    onValueUpdate,
    leftElement,
    color,
    textInput,
    password,
    statusMessage,
    style,
    clearable,
    reset,
    maxLength,
  } = props;
  const initialValue = props.initialValue || "";
  const error: boolean = ((props.error || false) && props.showError) || false;
  const success: boolean = props.success || false;
  const _onFocus = props.onFocus || (() => {});
  const _onBlur = props.onBlur || (() => {});

  // TextInput
  const multiline = textInput?.multiline || props.multiline || false;
  const editable = textInput?.editable || true;
  const input = useRef(null);

  // Value | Focused
  const [_value, setValue] = useState<string>(initialValue || "");
  const value = props.value || _value;
  const valueHasChanged = value !== initialValue;
  const [isFocused, setIsFocused] = useState<boolean>(false);

  // Password
  const [showPassword, setShowPassword] = useState<boolean>(true);

  // ClearIcon
  const onClear = props.onClear || (() => {});
  const showClearIcon: boolean =
    (clearable && !password && editable && value !== "") || false;

  // Current Status Message
  const [showStatusMessage, setShowStatusMessage] = useState<boolean>(false);

  // Colors
  const activeColor: string = color?.activeColor || "black";
  const inactiveColor: string = color?.inactiveColor || "gray";
  const changedColor: string = color?.changedColor || activeColor;
  const errorColor: string = color?.errorColor || "red";
  const successColor: string = color?.successColor || "green";
  const backgroundColor: string = color?.backgroundColor || "white";
  const inputColor: string = color?.inputColor || "black";
  const currentColor: string =
    (error && errorColor) ||
    (valueHasChanged && changedColor) ||
    ((isFocused || value !== "") && activeColor) ||
    inactiveColor;

  //======================================================================================================================
  // Animation
  //======================================================================================================================

  // Input Animation
  const inputAnimation = useRef(new Animated.Value(0)).current;

  const moveLabelUp = () => {
    Animated.timing(inputAnimation, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const moveLabelDown = () => {
    Animated.timing(inputAnimation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const fontSizeAnim = inputAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 14],
  });

  const colorAnim = inputAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [
      (error && errorColor) ||
        (!valueHasChanged && inactiveColor) ||
        changedColor,
      (error && errorColor) ||
        (!valueHasChanged && activeColor) ||
        changedColor,
    ],
  });

  const labelTopAnim = inputAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [7, -11],
  });

  const labelPaddingHorizontalAnim = inputAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 3],
  });

  useEffect(() => {
    if (isFocused || value !== "") {
      moveLabelUp();
    } else {
      moveLabelDown();
    }
  }, [isFocused, value]);

  // Password Icon Animation
  const passwordIconAnimation = useRef<Animatable.View & View>(null);

  useEffect(() => {
    if (showPassword) {
      // @ts-ignore
      passwordIconAnimation.current?.rotate(200);
    } else {
      // @ts-ignore
      passwordIconAnimation.current?.rotate(200);
    }
  }, [showPassword]);

  // StatusMessage Animation
  const statusMessageAnimation = useRef<Animatable.View & View>(null);

  useEffect(() => {
    const Animation = async () => {
      if (error || success) {
        setShowStatusMessage(true);
        // @ts-ignore
        await statusMessageAnimation.current?.bounceIn();
      } else {
        // @ts-ignore
        await statusMessageAnimation.current?.bounceOut();
        setShowStatusMessage(false);
      }
    };

    Animation();
  }, [statusMessageAnimation, error, success]);

  //======================================================================================================================
  // Set Initial Value
  //======================================================================================================================

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  //======================================================================================================================
  // Reset Input
  //======================================================================================================================

  useEffect(() => {
    //  console.log("Reset Input " + title + " | " + reset);
    if (reset) onChangeText("");
  }, [reset]);

  //======================================================================================================================
  // Handle prop onFocus onBlur
  //======================================================================================================================

  useEffect(() => {
    if (isFocused) _onFocus();
    else _onBlur();
  }, [isFocused]);

  //======================================================================================================================
  // On Change Text
  //======================================================================================================================

  const onChangeText = useCallback(
    (_value: string) => {
      if (_value !== value) {
        setValue(_value);
        onValueUpdate(_value);
      }
    },
    [value]
  );

  //======================================================================================================================
  // On Focus
  //======================================================================================================================

  const onFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  //======================================================================================================================
  // On Blur
  //======================================================================================================================

  const onBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  //======================================================================================================================
  // On Password Icon Pressed
  //======================================================================================================================

  const _onPasswordIconPressed = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  //======================================================================================================================
  // On Clear Icon Pressed
  //======================================================================================================================

  const _onClear = useCallback(() => {
    onClear();
    onChangeText("");
  }, []);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <Container style={style}>
      <AnimatedFormContainer
        style={{ borderColor: colorAnim }}
        backgroundColor={backgroundColor}
      >
        {leftElement && (
          <LeftElementContainer multiline={multiline}>
            {cloneElement(leftElement, { color: currentColor })}
          </LeftElementContainer>
        )}

        <TouchableWithoutFeedback
          onPress={() => {
            //@ts-ignore
            input.current?.focus();
          }}
        >
          <Form>
            <Input
              ref={input}
              value={value}
              onChangeText={onChangeText}
              secureTextEntry={password && showPassword}
              onFocus={onFocus}
              onBlur={onBlur}
              multiline={multiline}
              inputColor={inputColor}
              maxLength={maxLength}
              {...textInput}
            />
            <AnimatedLabelContainer
              style={{
                top: labelTopAnim,
                paddingHorizontal: labelPaddingHorizontalAnim,
                backgroundColor: backgroundColor,
              }}
            >
              <AnimatedLabel
                style={{
                  color: colorAnim,
                  fontSize: fontSizeAnim,
                }}
                backgroundColor={backgroundColor}
              >
                {title}
              </AnimatedLabel>
            </AnimatedLabelContainer>
          </Form>
        </TouchableWithoutFeedback>

        {showClearIcon && !error && !success && (
          <RightIconContainer multiline={multiline}>
            <TouchableOpacity onPress={_onClear}>
              <CIcon type={"cross"} size={18} color={currentColor} />
            </TouchableOpacity>
          </RightIconContainer>
        )}

        {password && !error && !success && (
          <RightIconContainer multiline={multiline} ref={passwordIconAnimation}>
            <TouchableOpacity onPress={_onPasswordIconPressed}>
              <CIcon
                type={showPassword ? "eye" : "eyeOff"}
                size={18}
                color={currentColor}
              />
            </TouchableOpacity>
          </RightIconContainer>
        )}

        {success && (
          <RightIconContainer multiline={multiline}>
            <CIcon type={"checkCircle"} color={successColor} size={18} />
          </RightIconContainer>
        )}

        {error && (
          <RightIconContainer multiline={multiline}>
            <CIcon type={"crossCircle"} color={errorColor} size={18} />
          </RightIconContainer>
        )}
      </AnimatedFormContainer>

      <BottomTextContainer>
        <Animatable.View ref={statusMessageAnimation}>
          {showStatusMessage && (
            <StatusMessageContainer>
              <CText
                medium
                color={
                  (error && errorColor) || (success && successColor) || "black"
                }
              >
                {statusMessage}
              </CText>
            </StatusMessageContainer>
          )}
        </Animatable.View>

        {maxLength && (
          <LengthCounterContainer>
            <CText color={currentColor}>
              {value.length}/{maxLength}
            </CText>
          </LengthCounterContainer>
        )}
      </BottomTextContainer>
    </Container>
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const Container = styled.View`
  padding-top: 10px;
  min-width: 200px;
  min-height: 50px;
`;

const AnimatedFormContainer = Animated.createAnimatedComponent(styled.View<{
  backgroundColor: string;
}>`
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;

  padding: 0 10px;

  border-width: 1px;
  border-radius: 10px;
  background-color: ${(props) => props.backgroundColor};
`);

const Form = styled.View`
  flex: 1;
  justify-content: center;
  padding: 7px 0;
`;

const AnimatedLabelContainer = Animated.createAnimatedComponent(styled.View`
  position: absolute;
  left: 0;
`);

const AnimatedLabel = Animated.createAnimatedComponent(styled.Text<{
  backgroundColor: string;
}>`
  background-color: ${(props) => props.backgroundColor};
`);

const Input = styled.TextInput<{ inputColor: string }>`
  font-size: 20px;
  padding-top: 0;
  padding-bottom: 0;
  color: ${(props) => props.inputColor};
`;

const RightIconContainer = Animatable.createAnimatableComponent(styled.View<{
  multiline: boolean;
}>`
  margin-top: ${(props) => (!props.multiline ? 0 : 12)}px;
  align-self: ${(props) => (!props.multiline ? "center" : "flex-start")};
  margin-left: 5px;
`);

const StatusMessageContainer = styled.View`
  margin: 0 2px;
  justify-content: flex-start;
`;

const LeftElementContainer = styled.View<{ multiline: boolean }>`
  align-self: flex-start;
  align-items: center;
  justify-content: center;

  padding: 8px 5px 5px 0;
`;

const BottomTextContainer = styled.View`
  flex-direction: row;
`;

const LengthCounterContainer = styled.View`
  position: absolute;
  right: 5px;
  top: 2px;
`;

export default CInput;

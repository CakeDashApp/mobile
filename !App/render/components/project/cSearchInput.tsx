import React, {useCallback, useContext, useEffect, useRef, useState} from "react";
import { TextInputProps, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";
import core from "../../../src/core";
import CIcon from "../../../assets/icons/cIcon";
import * as Animatable from "react-native-animatable";
import CButton from "../default/cButton";
import { ThemeInterface } from "../../../src/core/controllers/ui/interfaces";
import ThemeContext from "../../../context/ThemeContext";

interface Props {
  // Input
  initialValue?: string;
  onValueUpdate: (value: string) => void;
  textInput?: TextInputProps;
  isDummy?: boolean;

  // Other
  defaultOpen: boolean;
  onOpen?: () => void;
  onClose?: () => void;

  // Clear
  clearable?: boolean;
  onClear?: () => void;

  // Style
  style?: object;
}

const CSearchInput: React.FC<Props> = (props) => {
  // Props
  const {
    onValueUpdate,
    defaultOpen,
    clearable,
    textInput,
    style,
    isDummy,
  } = props;
  const initialValue = props.initialValue || "";
  const onOpen = props.onOpen || (() => {});
  const onClose = props.onClose || (() => {});

  // TextInput
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);
  const [showSearchbar, setShowSearchbar] = useState<boolean>(defaultOpen);

  // Value
  const [value, setValue] = useState<string>(initialValue || "");

  // ClearIcon
  const onClear = props.onClear || (() => {});
  const showClearIcon: boolean = (clearable && value !== "") || false;

  // Theme
  const theme = useContext(ThemeContext);

  //======================================================================================================================
  // Animation
  //======================================================================================================================

  // SearchAnimation
  const searchAnimation = useRef<Animatable.View & View>(null);

  // SearchButtonAnimation
  const searchButtonAnimation = useRef<Animatable.View & View>(null);

  useEffect(() => {
    const Animation = async () => {
      if (isOpen) {
        setShowSearchbar(true);
        // @ts-ignore
        await searchAnimation.current?.slideInRight(500);
      } else {
        // @ts-ignore
        await searchAnimation.current?.bounceOutRight(500);
        // @ts-ignore
        searchButtonAnimation.current?.pulse();
        setShowSearchbar(false);
      }
    };

    Animation();
  }, [isOpen]);

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
  // On Clear Icon Pressed
  //======================================================================================================================

  const _onClear = useCallback(() => {
    onClear();
    onChangeText("");
  }, [onClear]);

  //======================================================================================================================
  // On Close
  //======================================================================================================================

  const _onClose = useCallback(async () => {
    setIsOpen(false);
    await core.helper.date.sleep(500); // Await animation
    onClose();
    onChangeText("");
  }, [onClose]);

  //======================================================================================================================
  // On Open
  //======================================================================================================================

  const _onOpen = useCallback(async () => {
    if (!isDummy) setIsOpen(true);
    onOpen();
  }, [onOpen]);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  // After Removing SearchContainer and FormContainer the textinput is working fine
  return (
    <Container style={style}>
      <Animatable.View ref={searchButtonAnimation}>
        {!isOpen && !showSearchbar && (
          <CButton
            onPress={_onOpen}
            width={50}
            height={50}
            color={theme.colors.on_surface_3}
            round
          >
            <CIcon
              type={"search"}
              color={theme.colors.on_surface}
              strokeWidth={2}
              size={25}
            />
          </CButton>
        )}
      </Animatable.View>

      <Animatable.View ref={searchAnimation}>
        {showSearchbar && (
          <SearchContainer>
            <FormContainer style={theme.shadow}>
              <LeftIconContainer>
                <CIcon
                  type={"search"}
                  color={theme.colors.on_primary}
                  strokeWidth={2}
                  size={25}
                />
              </LeftIconContainer>

              <Form>
                <Input
                  value={value}
                  onChangeText={onChangeText}
                  autoFocus={true}
                  {...textInput}
                />
              </Form>

              {showClearIcon && (
                <RightIconContainer>
                  <TouchableOpacity onPress={_onClear}>
                    <CIcon
                      type={"cross"}
                      size={18}
                      color={theme.colors.on_secondary}
                      strokeWidth={2}
                    />
                  </TouchableOpacity>
                </RightIconContainer>
              )}
            </FormContainer>

            <CButton
              onPress={_onClose}
              width={35}
              height={35}
              color={theme.colors.on_surface_3}
              shadow
              round
            >
              <CIcon type={"cross"} size={15} strokeWidth={2} />
            </CButton>
          </SearchContainer>
        )}
      </Animatable.View>
    </Container>
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const Container = styled.View`
  flex-direction: row;
`;

const Input = styled.TextInput<{ theme: ThemeInterface }>`
  font-size: 20px;
  padding-top: 0;
  padding-bottom: 0;
  color: ${(props) => props.theme.colors.on_secondary};
`;

const Form = styled.View`
  flex: 1;
  justify-content: center;
  padding: 7px 0;
`;

const SearchContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

const FormContainer = styled.View<{ theme: ThemeInterface }>`
  width: 85%;
  background-color: ${(props) => props.theme.colors.secondary};
  padding: 0 10px;
  border-radius: 100px;
  flex-direction: row;
`;

const RightIconContainer = styled.View`
  align-self: center;
  margin-right: 10px;
`;

const LeftIconContainer = styled.View`
  align-items: center;
  justify-content: center;

  padding: 8px 5px 5px 0;
`;

export default CSearchInput;

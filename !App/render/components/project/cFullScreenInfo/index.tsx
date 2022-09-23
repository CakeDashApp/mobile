import React, {useContext, useState} from "react";
import { Modal, TouchableOpacity } from "react-native";
import CText from "../../default/cText";
import styled from "styled-components/native";
import strings from "./strings";
import { ThemeInterface } from "../../../../src/core/controllers/ui/interfaces";
import ThemeContext from "../../../../context/ThemeContext";

export interface Props {
  //Error
  error?: string | boolean;
  onTryAgain?: () => void;

  //Color
  color?: string;
}

const CFullScreenInfo: React.FC<Props> = (props) => {
  // Theme
  const theme = useContext(ThemeContext);

  // Props
  const { error, onTryAgain } = props;
  const color: string = props.color || theme.colors.on_surface;

  // Texts
  const errorText =
    typeof error === "string" ? error : strings().defaultErrorMessage;

  // Images
  const [errorImagePath] = useState(
    require("../../../../assets/images/error/error.png")
  );

  //======================================================================================================================
  // Render ModalError
  //======================================================================================================================

  const ModalError = () => {
    return (
      <Modal transparent={true} animationType={"slide"}>
        <ErrorContainer>
          <Error style={theme.shadow}>
            <ErrorImage source={errorImagePath} resizeMode={"contain"} />
            <CText color={color}>{errorText}</CText>
            {onTryAgain && (
              <TouchableOpacity onPress={onTryAgain}>
                <CText size={16} bold color={theme.colors.secondary}>
                  Try Again!
                </CText>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={() => {}}>
              <CText style={{ color: theme.colors.primary }}>
                Report Issue
              </CText>
            </TouchableOpacity>
          </Error>
        </ErrorContainer>
      </Modal>
    );
  };

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return <>{error && <ModalError />}</>;
};

//======================================================================================================================
// Styles
//======================================================================================================================

const ErrorContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Error = styled.View<{ theme: ThemeInterface }>`
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background-color: ${(props) => props.theme.colors.surface};
  height: 98%;
  width: 98%;
`;

const ErrorImage = styled.Image`
  height: 300px;
`;

export default CFullScreenInfo;

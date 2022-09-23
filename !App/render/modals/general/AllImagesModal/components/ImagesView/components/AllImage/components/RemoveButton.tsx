import React, {useContext} from "react";
import styled from "styled-components/native";
import CIcon from "../../../../../../../../../assets/icons/cIcon";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ThemeInterface } from "../../../../../../../../../src/core/controllers/ui/interfaces";
import ThemeContext from "../../../../../../../../../context/ThemeContext";

interface Props {
  onPress: () => void;
}

const RemoveButton: React.FC<Props> = (props) => {
  // Props
  const { onPress } = props;

  // Theme
  const theme = useContext(ThemeContext);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <Container>
      <TouchableOpacity onPress={onPress}>
        <ButtonContainer>
          <CIcon
            type={"cross"}
            color={theme.colors.on_surface}
            size={15}
            strokeWidth={2}
          />
        </ButtonContainer>
      </TouchableOpacity>
    </Container>
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const Container = styled.View<{ theme: ThemeInterface }>`
  width: 25px;
  height: 25px;
  padding: 2px;
  position: absolute;
  right: 0;
  top: 0;
  border-radius: 100px;
  background-color: ${(props) => props.theme.colors.surface};
`;

const ButtonContainer = styled.View<{ theme: ThemeInterface }>`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.on_surface_3};
  border-radius: 100px;
`;

export default RemoveButton;

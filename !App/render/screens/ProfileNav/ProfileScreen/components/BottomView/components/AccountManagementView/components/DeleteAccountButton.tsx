import React, {useContext} from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import CText from "../../../../../../../../components/default/cText";
import strings from "../strings";
import styled from "styled-components/native";
import ThemeContext from "../../../../../../../../../context/ThemeContext";

interface Props {
  onPress: () => void;
}

const DeleteAccountButton: React.FC<Props> = (props) => {
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
        <CText color={theme.colors.error}>
          {strings().deleteAccountButtonText}
        </CText>
      </TouchableOpacity>
    </Container>
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const Container = styled.View`
  align-self: flex-start;
`;

export default DeleteAccountButton;

import React, {useContext} from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import CText from "../../../../../../../../components/default/cText";
import strings from "../strings";
import styled from "styled-components/native";
import ThemeContext from "../../../../../../../../../context/ThemeContext";

interface Props {
  onPress: () => void;
}

const LogoutButton: React.FC<Props> = (props) => {
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
        <CText bold size={20} color={theme.colors.on_background_2}>
          {strings().logoutButtonText}
        </CText>
      </TouchableOpacity>
    </Container>
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const Container = styled.View`
  margin-bottom: 10px;
  align-self: flex-start;
`;

export default LogoutButton;

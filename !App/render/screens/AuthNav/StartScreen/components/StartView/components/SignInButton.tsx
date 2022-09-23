import React, {useContext} from "react";
import CText from "../../../../../../components/default/cText";
import strings from "../../../strings";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";
import ThemeContext from "../../../../../../../context/ThemeContext";

interface Props {
  onPress: () => void;
}

const SignInButton: React.FC<Props> = (props) => {
  // Props
  const { onPress } = props;

  // Theme
  const theme = useContext(ThemeContext);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <Button onPress={onPress}>
      <CText color={theme.colors.on_surface_2} bold>
        {strings().signInButtonText}
      </CText>
    </Button>
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const Button = styled(TouchableOpacity)`
  align-self: flex-start;
`;

export default SignInButton;

import CText from "../../../../../../components/default/cText";
import strings from "../../../strings";
import React, {useContext} from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import ThemeContext from "../../../../../../../context/ThemeContext";

interface Props {
  onPress: () => void;
}

const ForgotPasswordButton: React.FC<Props> = (props) => {
  // Props
  const { onPress } = props;

  // Theme
  const theme = useContext(ThemeContext);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <TouchableOpacity onPress={onPress}>
      <CText bold color={theme.colors.secondary}>
        {strings().forgotPasswordButtonText}
      </CText>
    </TouchableOpacity>
  );
};

export default ForgotPasswordButton;

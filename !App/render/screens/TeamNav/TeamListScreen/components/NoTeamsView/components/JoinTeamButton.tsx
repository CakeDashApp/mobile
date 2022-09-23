import React, {useContext} from "react";
import CText from "../../../../../../components/default/cText";
import strings from "../strings";
import { TouchableOpacity } from "react-native";
import ThemeContext from "../../../../../../../context/ThemeContext";

interface Props {
  onPress: () => void;
}

const JoinTeamButton: React.FC<Props> = (props) => {
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
        {strings().joinTeamButtonText}
      </CText>
    </TouchableOpacity>
  );
};

export default JoinTeamButton;

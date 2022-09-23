import React, {useContext} from "react";
import CIcon from "../../../../../assets/icons/cIcon";
import { TouchableOpacity } from "react-native";
import ThemeContext from "../../../../../context/ThemeContext";

interface Props {
  teamId: string;
  onJoin: (id: string) => void;
}

const JoinButton: React.FC<Props> = (props) => {
  // Props
  const { teamId, onJoin } = props;

  // Theme
    const theme = useContext(ThemeContext);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <TouchableOpacity onPress={() => onJoin(teamId)}>
      <CIcon
        type={"userPlus"}
        color={theme.colors.on_surface}
        strokeWidth={2}
      />
    </TouchableOpacity>
  );
};

export default JoinButton;

import React, {useContext} from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import Toast from "react-native-simple-toast";
import CIcon from "../../../../../../../../../../assets/icons/cIcon";
import ThemeContext from "../../../../../../../../../../context/ThemeContext";

interface Props {}

const DummyUserBadge: React.FC<Props> = (props) => {
  // Theme
  const theme = useContext(ThemeContext);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <TouchableOpacity onPress={() => Toast.show("Dummy User")}>
      <CIcon
        size={20}
        type={"cpu"}
        color={theme.colors.on_surface}
        strokeWidth={2}
      />
    </TouchableOpacity>
  );
};

export default DummyUserBadge;

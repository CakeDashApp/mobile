import React, {useContext} from "react";
import CSectionModal from "../../../../../components/project/cSectionModal";
import strings from "./strings";
import CText from "../../../../../components/default/cText";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ThemeContext from "../../../../../../context/ThemeContext";

interface Props {}

const ChangePasswordModal: React.FC<Props> = (props) => {
  // Navigation
  const navigation = useNavigation();
  const goToProfile = () => navigation.navigate("Profile");

  // Theme
  const theme = useContext(ThemeContext);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <CSectionModal
      sections={[
        {
          key: 1,
          content: (
            <View>
              <CText color={theme.colors.on_surface}>
                This feature doesn't exist yet :/
              </CText>
            </View>
          ),
          name: strings().changePasswordTitle,
          icon: { type: "lock", iconStroke: 2 },
        },
      ]}
      onGoBack={goToProfile}
      backButton
    />
  );
};

export default ChangePasswordModal;

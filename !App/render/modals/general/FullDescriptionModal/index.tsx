import React, {useContext} from "react";
import { View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import CText from "../../../components/default/cText";
import CSectionModal from "../../../components/project/cSectionModal";
import strings from "./strings";
import ThemeContext from "../../../../context/ThemeContext";

interface Props {}

const FullDescriptionModal: React.FC<Props> = (props) => {
  // Navigation
  const navigation = useNavigation();
  const route = useRoute();
  const goBack = () => navigation.goBack();

  // Theme
  const theme = useContext(ThemeContext);

  // Description
  const description: string =
    route.params?.description || strings().emptyDescriptionError;

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
              <CText color={theme.colors.on_surface}>{description}</CText>
            </View>
          ),
          name: strings().descriptionModalTitle,
          icon: { type: "fileText", iconStroke: 2 },
        },
      ]}
      onGoBack={goBack}
      backButton
    />
  );
};

export default FullDescriptionModal;

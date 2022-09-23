import React, {useContext} from "react";
import styled from "styled-components/native";
import GeneralView from "./components/GeneralView";
import ResourcesView from "./components/ResourcesView";
import { useNavigation } from "@react-navigation/native";
import CSectionModal from "../../../../../../components/project/cSectionModal";
import strings from "./strings";
import ThemeContext from "../../../../../../../context/ThemeContext";

interface Props {}

const AppSettingsModal: React.FC<Props> = (props) => {
  // Navigation
  const navigation = useNavigation();
  const goToSettingsModal = () => navigation.navigate("SettingsModal");

  // Language
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
            <Container>
              <GeneralView />
              <ResourcesView />
            </Container>
          ),
          name: strings().settingsAppTitle,
          icon: { type: "smartPhone", iconStroke: 2 },
          nameInfo: strings().settingsAppSubTitle,
        },
      ]}
      onGoBack={goToSettingsModal}
      backButton
    />
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const Container = styled.View`
  margin-top: 15px;
`;

export default AppSettingsModal;

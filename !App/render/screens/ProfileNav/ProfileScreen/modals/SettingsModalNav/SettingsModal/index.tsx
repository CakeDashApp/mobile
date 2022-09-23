import React from "react";
import SettingsItem from "../components/SettingsItem";
import styled from "styled-components/native";
import AppSettingsModal from "../AppSettingsModal";
import { useNavigation } from "@react-navigation/native";
import CSectionModal from "../../../../../../components/project/cSectionModal";
import core from "../../../../../../../src/core";
import strings from "./strings";
import { useAgile } from "@agile-ts/react";

interface Props {}

const SettingsModal: React.FC<Props> = (props) => {
  // Navigation
  const navigation = useNavigation();
  const goToProfile = () => navigation.navigate("Profile");
  const goToAppSettingsModal = () => navigation.navigate("AppSettingsModal");

  // Version
  const version = useAgile(core.other.VERSION_CODE);

  // Language
  useAgile(core.other.LANGUAGE);

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
              <SettingsItem
                title={strings().settingsAppButtonTitle}
                subtitle={strings().settingsAppButtonText}
                icon={"smartPhone"}
                color={"#D96DFF"}
                onPress={goToAppSettingsModal}
              />
            </Container>
          ),
          name: strings().settingsTitle,
          icon: { type: "settings", iconStroke: 2 },
          nameInfo: strings().settingsSubTitle.replace("${version}", version),
        },
      ]}
      onGoBack={goToProfile}
      backButton
    />
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const Container = styled.View`
  margin-top: 15px;
  margin-bottom: 50px;
`;

export default SettingsModal;

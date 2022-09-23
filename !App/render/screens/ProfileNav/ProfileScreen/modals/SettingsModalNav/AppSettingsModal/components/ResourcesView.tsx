import CText from "../../../../../../../components/default/cText";
import { View, Linking } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import React, {useContext} from "react";
import styled from "styled-components/native";
import SettingsActionItem from "../../components/SettingsActionItem";
import strings from "../strings";
import { ThemeInterface } from "../../../../../../../../src/core/controllers/ui/interfaces";
import ThemeContext from "../../../../../../../../context/ThemeContext";

interface Props {}

const ResourcesView: React.FC<Props> = (props) => {
  // Theme
  const theme = useContext(ThemeContext);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <View>
      <CText bold color={theme.colors.on_surface_2}>
        {strings().resourcesTitle}
      </CText>
      <ActionItem
        title={strings().vectorIconsTitle}
        subtitle={strings().vectorIconsText}
        color={"#06D9E7"}
        icon={"feather"}
      >
        <TouchableOpacity
          onPress={() => Linking.openURL("https://feathericons.com/")}
        >
          <CText bold color={theme.colors.secondary}>
            {strings().websiteButtonText}
          </CText>
        </TouchableOpacity>
      </ActionItem>
      <Separator />
      <ActionItem
        title={strings().vectorImagesTitle}
        subtitle={strings().vectorImagesText}
        color={"#06E752"}
        icon={"image"}
      >
        <TouchableOpacity
          onPress={() => Linking.openURL("https://www.freepik.com/")}
        >
          <CText bold color={theme.colors.secondary}>
            {strings().websiteButtonText}
          </CText>
        </TouchableOpacity>
      </ActionItem>
    </View>
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const ActionItem = styled(SettingsActionItem)`
  margin: 10px 0;
`;

const Separator = styled.View<{ theme: ThemeInterface }>`
  width: 100%;
  height: 1px;
  background-color: ${(props) => props.theme.colors.on_surface};
  margin: 5px 0;
`;

export default ResourcesView;

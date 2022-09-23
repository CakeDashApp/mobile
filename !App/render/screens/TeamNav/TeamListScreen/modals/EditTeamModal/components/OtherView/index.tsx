import React, {useContext} from "react";
import { View } from "react-native";
import * as controller from "../../controller";
import CText from "../../../../../../../components/default/cText";
import styled from "styled-components/native";
import HiddenDasherButton from "./components/HiddenDasherButton";
import strings from "./strings";
import ThemeContext from "../../../../../../../../context/ThemeContext";

interface Props {}

const OtherView: React.FC<Props> = (props) => {
  // Theme
  const theme = useContext(ThemeContext);

  // Settings
  const hiddenDasher = controller.TeamEditor.getValue("hiddenDasher") || false;

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <View>
      <HiddenDasherButton
        selected={hiddenDasher}
        onPress={() =>
          controller.TeamEditor.setValue("hiddenDasher", !hiddenDasher)
        }
      />
      <Description color={theme.colors.on_surface_3} size={10}>
        {strings().hiddenDasherDescription}
      </Description>
    </View>
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const Description = styled(CText)`
  margin-top: 10px;
`;

export default OtherView;

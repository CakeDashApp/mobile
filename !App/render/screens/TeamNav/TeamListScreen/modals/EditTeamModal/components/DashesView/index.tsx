import React, {useContext} from "react";
import { View } from "react-native";
import Slider from "@react-native-community/slider";
import * as controller from "../../controller";
import styled from "styled-components/native";
import CText from "../../../../../../../components/default/cText";
import strings from "./strings";
import ThemeContext from "../../../../../../../../context/ThemeContext";

interface Props {}

const DashesView: React.FC<Props> = (props) => {
  // Theme
  const theme = useContext(ThemeContext);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <View>
      <SliderContainer>
        <CText bold color={theme.colors.on_surface} size={25}>
          {controller.TeamEditor.getValue("dashes")}
        </CText>
        <DashesSlider
          minimumValue={1}
          maximumValue={10}
          thumbTintColor={theme.colors.secondary}
          minimumTrackTintColor={theme.colors.secondary}
          maximumTrackTintColor={theme.colors.on_surface_2}
          onValueChange={(value: number) =>
            controller.TeamEditor.setValue("dashes", Math.round(value))
          }
          value={
            controller.TeamEditor.getValue("dashes") ===
            controller.TeamEditor.getOriginalValue("dashes")
              ? controller.TeamEditor.getValue("dashes")
              : undefined
          }
        />
      </SliderContainer>
      <Description color={theme.colors.on_surface_3} size={10}>
        {strings().dashesDescription}
      </Description>
    </View>
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const DashesSlider = styled(Slider)`
  width: 100%;
  height: 40px;
  margin-left: 5px;
`;

const SliderContainer = styled.View`
  align-items: center;
  flex-direction: row;
`;

const Description = styled(CText)`
  margin-top: 10px;
`;

export default DashesView;

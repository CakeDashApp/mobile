import React, {useContext, useState} from "react";
import { Dimensions } from "react-native";
import styled from "styled-components/native";
import strings from "./strings";
import core from "../../../../../../../../src/core";
import CImage from "../../../../../../../components/default/cImage";
import CText from "../../../../../../../components/default/cText";
import { useAgile } from "@agile-ts/react";
import { ThemeInterface } from "../../../../../../../../src/core/controllers/ui/interfaces";
import ThemeContext from "../../../../../../../../context/ThemeContext";

interface Props {}

const NoCakesView: React.FC<Props> = (props) => {
  // Theme
  const theme = useContext(ThemeContext);
  const themeType = useAgile(core.ui.THEME_TYPE);

  // Images
  const [relaxImagePath_Dark] = useState(
    require("../../../../../../../../assets/images/relax/relax_dark.png")
  );
  const [relaxImagePath_Light] = useState(
    require("../../../../../../../../assets/images/relax/relax_light.png")
  );

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <Container>
      <CImage
        source={
          themeType === "dark" ? relaxImagePath_Dark : relaxImagePath_Light
        }
        resizeMode={"contain"}
        width={Dimensions.get("window").width}
        height={150}
      />
      <TextContainer>
        <CText color={theme.colors.on_background}>
          {strings().noCakesText}
        </CText>
      </TextContainer>
    </Container>
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const Container = styled.View<{ theme: ThemeInterface }>`
  height: 80%;
  background-color: ${(props) => props.theme.colors.background};
  align-items: center;
  justify-content: center;
`;

const TextContainer = styled.View`
  margin-top: 3px;
  align-items: center;
`;

export default NoCakesView;

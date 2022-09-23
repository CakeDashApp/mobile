import React, {useContext, useState} from "react";
import styled from "styled-components/native";
import CImage from "../../../../../../../../components/default/cImage";
import { Dimensions } from "react-native";
import CText from "../../../../../../../../components/default/cText";
import core from "../../../../../../../../../src/core";
import strings from "../strings";
import { useAgile } from "@agile-ts/react";
import ThemeContext from "../../../../../../../../../context/ThemeContext";

interface Props {}

const NoEventsView: React.FC<Props> = (props) => {
  // Theme
  const theme = useContext(ThemeContext);
  const themeType = useAgile(core.ui.THEME_TYPE);

  // Images
  const [noEventsImagePath_Dark] = useState(
    require("../../../../../../../../../assets/images/News/news_dark.png")
  );
  const [noEventsImagePath_Light] = useState(
    require("../../../../../../../../../assets/images/News/news_light.png")
  );

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <Container>
      <CImage
        width={Dimensions.get("window").width}
        height={150}
        source={
          themeType === "dark"
            ? noEventsImagePath_Dark
            : noEventsImagePath_Light
        }
        resizeMode={"contain"}
      />
      <TextContainer>
        <CText color={theme.colors.on_background}>
          {strings().noEventsText}
        </CText>
      </TextContainer>
    </Container>
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const Container = styled.View`
  align-items: center;
  justify-content: center;
`;

const TextContainer = styled.View`
  margin-top: 3px;
  align-items: center;
`;

export default NoEventsView;

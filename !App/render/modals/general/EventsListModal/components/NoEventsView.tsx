import React, {useContext, useEffect, useRef, useState} from "react";
import { Animated, Dimensions } from "react-native";
import styled from "styled-components/native";
import strings from "../strings";
import core from "../../../../../src/core";
import CImage from "../../../../components/default/cImage";
import CText from "../../../../components/default/cText";
import { useAgile } from "@agile-ts/react";
import ThemeContext from "../../../../../context/ThemeContext";

interface Props {}

const NoEventsView: React.FC<Props> = (props) => {
  // Theme
  const theme = useContext(ThemeContext);
  const themeType = useAgile(core.ui.THEME_TYPE);

  // Images
  const [noEventsImagePath_Dark] = useState(
    require("../../../../../assets/images/News/news_dark.png")
  );
  const [noEventsImagePath_Light] = useState(
    require("../../../../../assets/images/News/news_light.png")
  );

  // Keyboard
  const keyboardIsVisible = useAgile(core.ui.KEYBOARD_IS_VISIBLE);
  const keyboardHeight = useAgile(core.ui.KEYBOARD_HEIGHT);

  //======================================================================================================================
  // Animation
  //======================================================================================================================

  // Input Animation
  const inputAnimation = useRef(new Animated.Value(0)).current;

  const moveUp = () => {
    Animated.timing(inputAnimation, {
      toValue: 1,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  const moveDown = () => {
    Animated.timing(inputAnimation, {
      toValue: 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  const bottomAnimation = inputAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [80, keyboardHeight],
  });

  useEffect(() => {
    if (keyboardIsVisible) moveUp();
    else moveDown();
  }, [keyboardIsVisible]);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <CenterContainer>
      <Animated.View
        style={{ marginBottom: bottomAnimation, alignItems: "center" }}
      >
        <CImage
          width={Dimensions.get("window").width}
          height={keyboardIsVisible ? 150 : 220}
          source={
            themeType === "dark"
              ? noEventsImagePath_Dark
              : noEventsImagePath_Light
          }
          resizeMode={"contain"}
        />
        <CText color={theme.colors.on_surface}>{strings().noEventsText}</CText>
      </Animated.View>
    </CenterContainer>
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const CenterContainer = styled.View`
  align-items: center;
  justify-content: center;
  height: 80%;
`;

export default NoEventsView;

import React, {useContext, useEffect, useRef} from "react";
import core from "../../../../../../../src/core";
import Refresh from "../../../../../../../assets/icons/icons/Refresh";
import CText from "../../../../../../components/default/cText";
import { Animated } from "react-native";
import styled from "styled-components/native";
import strings from "../strings";
import { useAgile } from "@agile-ts/react";
import ThemeContext from "../../../../../../../context/ThemeContext";

interface Props {
  isLoading: boolean;
  isSearching: boolean;
  searchValue: string;
}

const NoTeamsView: React.FC<Props> = (props) => {
  // Props
  const { isLoading, isSearching, searchValue } = props;

  // Theme
  const theme = useContext(ThemeContext);

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
      <Animated.View style={{ marginBottom: bottomAnimation }}>
        {isLoading ? (
          <Refresh color={theme.colors.on_surface} />
        ) : (
          <CText color={theme.colors.on_surface}>
            {isSearching
              ? strings().noTeamFoundCalledInfoText.replace(
                  "${name}",
                  searchValue
                )
              : strings().noTeamFoundInfoText}
          </CText>
        )}
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

export default NoTeamsView;

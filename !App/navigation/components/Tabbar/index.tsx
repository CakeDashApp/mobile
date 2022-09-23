import React, { useContext, useEffect, useRef, useState } from "react";
import { Dimensions, PixelRatio, View } from "react-native";
import Tab from "./components/Tab";
import core from "../../../src/core";
import * as Animatable from "react-native-animatable";
import styled from "styled-components/native";
import { useAgile } from "@agile-ts/react";
import ThemeContext from "../../../context/ThemeContext";

interface Props {
  //Color
  inactiveColor?: string;
  activeColor?: string;
  backgroundColor?: string;

  //Navigation
  state: any;
  descriptors: any;
  navigation: any;

  // Other
  show: boolean;
}

const Tabbar: React.FC<Props> = (props) => {
  // Props
  const { state, descriptors, navigation } = props;
  const show = props.show !== undefined ? props.show : true;

  // Show
  const [showTabbar, setShowTabbar] = useState<boolean>(show);

  // Theme
  const theme = useContext(ThemeContext);

  // User
  const user = useAgile(core.user.CURRENT_USER, "Tabbar");

  // Color
  const inactiveColor = props.inactiveColor || theme.colors.on_primary_2;
  const activeColor = props.activeColor || theme.colors.on_primary;
  const backgroundColor = props.backgroundColor || theme.colors.primary;

  // Icon KeyMap
  const keyMap: { [key: string]: any } = {
    Home: {
      icon: "home",
      size: 35,
    },
    Teams: {
      icon: "compass",
      size: 35,
    },
    Todo: {
      icon: "cake",
      size: 35,
    },
    Profile: {
      imageId: user && user.userData.imageId,
      size: 33,
    },
  };

  //========================================================================================================================
  // Animation
  //========================================================================================================================

  const tabbarAnimation = useRef<Animatable.View & View>(null);

  useEffect(() => {
    const Animation = async () => {
      if (show) {
        setShowTabbar(true);
        // @ts-ignore
        await tabbarAnimation.current?.fadeInUpBig();
      } else {
        // @ts-ignore
        await tabbarAnimation.current?.fadeOutDownBig();
        setShowTabbar(false);
      }
    };

    Animation();
  }, [show]);

  //========================================================================================================================
  // Render
  //========================================================================================================================

  return (
    <Animatable.View ref={tabbarAnimation}>
      {showTabbar && (
        <Container backgroundColor={backgroundColor} style={theme.shadow}>
          <Tabs>
            {state.routes.map((route: any, index: number) => {
              // Is Focused
              const isFocused = props.state.index === index;

              // RouteName
              const routeName = route.name;

              // Is Active
              const isActive = props.state.index === index;

              // On Press
              const onPress = () => {
                const event = props.navigation.emit({
                  type: "tabPress",
                  target: route.key,
                  canPreventDefault: true,
                });

                if (!isFocused && !event.defaultPrevented) {
                  props.navigation.navigate(route.name);
                }
              };

              return (
                <TabContainer key={index}>
                  <Tab
                    onPress={onPress}
                    isActive={isActive}
                    inactiveColor={inactiveColor}
                    activeColor={activeColor}
                    backgroundColor={backgroundColor}
                    activeText={routeName}
                    imageId={keyMap[routeName].imageId}
                    icon={keyMap[routeName].icon}
                    iconSize={keyMap[routeName].size}
                  />
                </TabContainer>
              );
            })}
          </Tabs>
        </Container>
      )}
    </Animatable.View>
  );
};

//========================================================================================================================
// Styles
//========================================================================================================================

const Container = styled.SafeAreaView<{ backgroundColor: string }>`
  background-color: ${(props) => props.backgroundColor};
  position: absolute;
  bottom: 0;
  left: 0;
`;

const Tabs = styled.View`
  flex-direction: row;
`;

const TabContainer = styled.View`
  width: ${PixelRatio.roundToNearestPixel(
    Dimensions.get("window").width / 4
  )}px;
  height: 60px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export default Tabbar;

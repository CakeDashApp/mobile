import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import core from "../../../../src/core";
import CImage from "../../../components/default/cImage";
import CText from "../../../components/default/cText";
import * as Animatable from "react-native-animatable";
import styled from "styled-components/native";

interface Props {}

const SplashScreen: React.FC<Props> = (props) => {
  // Navigation
  const navigation = useNavigation();
  const goToLoading = () => navigation.navigate("Loading");

  // Images
  const [logoPath] = useState(
    require("../../../../assets/images/logo/logo_dark.png")
  );

  //======================================================================================================================
  // Load Storage
  //======================================================================================================================

  useEffect(() => {
    const loadStorage = async () => {
      console.log("Load Storage");

      // Sleep 3s
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Set Theme
      core.ui.setTheme(core.ui.THEME_TYPE.value);

      // Go to Loading
      goToLoading();
    };

    // Load Storage
    loadStorage();
  }, []);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <AnimatedContainer animation={"bounceIn"}>
      <Animatable.View animation={"bounceIn"}>
        <CImage
          source={logoPath}
          width={120}
          height={120}
          resizeMode={"contain"}
        />
        <CText size={10} bold color={"white"}>
          Version {core.other.VERSION_CODE.value}
        </CText>
      </Animatable.View>
    </AnimatedContainer>
  );
};

const AnimatedContainer = Animatable.createAnimatableComponent(styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #05376a;
`);

export default SplashScreen;

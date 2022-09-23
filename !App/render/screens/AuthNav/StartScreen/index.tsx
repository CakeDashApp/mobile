import React, { useContext, useEffect, useState } from "react";
import Headerbar from "../../../../navigation/components/Headerbar";
import { useNavigation } from "@react-navigation/native";
import strings from "./strings";
import core from "../../../../src/core";
import CImage from "../../../components/default/cImage";
import CText from "../../../components/default/cText";
import * as Animatable from "react-native-animatable";
import BackgroundView from "./components/BackgroundView";
import { View } from "react-native";
import StartView from "./components/StartView";
import styled from "styled-components/native";
import ThemeContext from "../../../../context/ThemeContext";

interface Props {}

const StartScreen: React.FC<Props> = (props) => {
  // Theme
  const theme = useContext(ThemeContext);

  // Navigation
  const navigation = useNavigation();
  const onGoSignIn = () => navigation.navigate("Auth", { signIn: true });
  const onGoSignUp = () => navigation.navigate("Auth", { signIn: false });

  // Images
  const [logoPath] = useState(
    require("../../../../assets/images/logo/logo_dark.png")
  );

  //======================================================================================================================
  // Header
  //======================================================================================================================

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: (props: any) => {
        return (
          <Headerbar
            {...props}
            title={strings().headerText}
            color={theme.colors.on_primary}
            absolute
          />
        );
      },
    });
  }, []);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <View style={{ flex: 1 }}>
      <BackgroundView />
      <Container>
        <Animatable.View animation={"bounceIn"}>
          <CImage
            source={logoPath}
            width={120}
            height={120}
            resizeMode={"contain"}
          />
          <CText size={10} bold color={theme.colors.on_primary}>
            Version {core.other.VERSION_CODE.value}
          </CText>
        </Animatable.View>
      </Container>
      <StartView onGoSignIn={onGoSignIn} onGoSignUp={onGoSignUp} />
    </View>
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const Container = styled.View`
  flex: 3;
  align-items: center;
  justify-content: center;
`;

export default StartScreen;

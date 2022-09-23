import React, {useContext} from "react";
import styled from "styled-components/native";
import * as Animatable from "react-native-animatable";
import CIcon from "../../../assets/icons/cIcon";
import CText from "../../../render/components/default/cText";
import { ThemeInterface } from "../../../src/core/controllers/ui/interfaces";
import ThemeContext from "../../../context/ThemeContext";

interface Props {}

const NavigationLoadingScreen: React.FC<Props> = (props) => {
    const theme = useContext(ThemeContext);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <Container>
      <LogoContainer>
        <Animatable.View animation={"swing"} iterationCount="infinite">
          <CIcon
            type={"cake"}
            color={theme.colors.on_background}
            fill
            size={50}
          />
        </Animatable.View>
      </LogoContainer>
      <LoadingText color={theme.colors.on_background}>Lodaing..</LoadingText>
    </Container>
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const Container = styled.View<{ theme: ThemeInterface }>`
  flex: 1;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.colors.background};
`;

const LogoContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const LoadingText = styled(CText)`
  margin-bottom: 40px;
`;

export default NavigationLoadingScreen;

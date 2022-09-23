import React, {useContext, useState} from "react";
import core from "../../../../../../src/core";
import CImage from "../../../../../components/default/cImage";
import { Dimensions } from "react-native";
import CText from "../../../../../components/default/cText";
import styled from "styled-components/native";
import strings from "./strings";
import JoinTeamButton from "./components/JoinTeamButton";
import { useAgile } from "@agile-ts/react";
import { ThemeInterface } from "../../../../../../src/core/controllers/ui/interfaces";
import ThemeContext from "../../../../../../context/ThemeContext";

interface Props {
  onJoinTeam: () => void;
}

const NoTeamsView: React.FC<Props> = (props) => {
  // Props
  const { onJoinTeam } = props;

  // Theme
  const theme = useContext(ThemeContext);
  const themeType = useAgile(core.ui.THEME_TYPE);

  // Images
  const [noTeamImagePath_Dark] = useState(
    require("../../../../../../assets/images/team_2/team_2_dark.png")
  );
  const [noTeamImagePath_Light] = useState(
    require("../../../../../../assets/images/team_2/team_2_light.png")
  );

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <Container>
      <CImage
        source={
          themeType === "dark" ? noTeamImagePath_Dark : noTeamImagePath_Light
        }
        resizeMode={"contain"}
        width={Dimensions.get("window").width}
        height={150}
      />
      <TextContainer>
        <CText color={theme.colors.on_background}>{strings().noTeamText}</CText>
        <JoinTeamButton onPress={onJoinTeam} />
      </TextContainer>
    </Container>
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const Container = styled.View<{ theme: ThemeInterface }>`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
  align-items: center;
  justify-content: center;
`;

const TextContainer = styled.View`
  margin-top: 3px;
  align-items: center;
  margin-bottom: 50px;
`;

export default NoTeamsView;

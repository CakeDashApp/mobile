import React, { useState } from "react";
import CText from "../../../../../components/default/cText";
import styled from "styled-components/native";
import CImage from "../../../../../components/default/cImage";
import core from "../../../../../../src/core";
import { Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import strings from "./strings";
import { useAgile } from "@agile-ts/react";

interface Props {
  teamId: string | null;
  onShowFullDescription: (id: string) => void;
}

const HeaderView: React.FC<Props> = (props) => {
  // Props
  const { teamId, onShowFullDescription } = props;

  // Team
  const team = useAgile(core.team.TEAMS.getItemById(teamId || ""));

  // Description
  const [maxDescriptionLength] = useState<number>(100);

  // Header
  const headerHeight = useAgile(core.ui.HEADER_HEIGHT);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  if (team) {
    return (
      <Container>
        <BackgroundImage>
          <CImage
            id={team.teamData.imageId}
            width={"100%"}
            height={"100%"}
            showIcon={false}
          />
          <BackgroundOverlay />
        </BackgroundImage>
        <TeamInfoContainer headerHeight={headerHeight}>
          <TextRowContainer>
            <TextContainer>
              <CText bold color={"white"} size={40}>
                {team.teamData.members.memberIds.length}
              </CText>
              <CText bold color={"white"}>
                {strings().membersTitle}
              </CText>
            </TextContainer>
            <TextContainer>
              <CText bold color={"white"} size={40}>
                {team.cakeIds.length}
              </CText>
              <CText bold color={"white"}>
                {strings().cakesTitle}
              </CText>
            </TextContainer>
            <TextContainer>
              <CText bold color={"white"} size={40}>
                {team.teamData.settings.dashes}
              </CText>
              <CText bold color={"white"}>
                {strings().dashesTitle}
              </CText>
            </TextContainer>
          </TextRowContainer>
          <TouchableOpacity
            onPress={() => onShowFullDescription(teamId || "")}
            disabled={team.teamData.description.length < maxDescriptionLength}
          >
            <Description color={"white"}>
              {core.helper.text.shortText(
                team.teamData.description,
                maxDescriptionLength
              )}
            </Description>
          </TouchableOpacity>
        </TeamInfoContainer>
      </Container>
    );
  }

  return null;
};

//======================================================================================================================
// Styles
//======================================================================================================================

const Container = styled.View`
  height: ${Dimensions.get("window").height / 3}px;
`;

const BackgroundImage = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;

const BackgroundOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  background-color: black;
  opacity: 0.5;
  height: 100%;
  width: 100%;
`;

const TeamInfoContainer = styled.View<{ headerHeight: number }>`
  flex: 1;
  margin-top: ${(props) => props.headerHeight}px;
  margin-left: 30px;
  margin-right: 10px;
  justify-content: center;
`;

const TextRowContainer = styled.View`
  flex-direction: row;
`;

const TextContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-right: 40px;
`;

const Description = styled(CText)`
  margin-top: 10px;
`;

export default HeaderView;

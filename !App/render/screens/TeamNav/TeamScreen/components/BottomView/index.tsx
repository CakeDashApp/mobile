import React from "react";
import styled from "styled-components/native";
import core from "../../../../../../src/core";
import MembersView from "./components/MembersView";
import EventsView from "./components/EventsView";
import CakesView from "./components/CakesView";
import { useAgile } from "@agile-ts/react";
import { ThemeInterface } from "../../../../../../src/core/controllers/ui/interfaces";

interface Props {
  teamId: string | null;
  goToMember: (memberId: string, teamId: string) => void;
  goToMemberListModal: (teamId: string, search: boolean) => void;
  goToEventsListModal: (teamId: string, search: boolean) => void;
  goToCakesListModal: (teamId: string) => void;
  goToCreateCakeModal: (cakeId: string) => void;
  goToEvent: (eventId: string, screen: string) => void;
}

const BottomView: React.FC<Props> = (props) => {
  // Props
  const {
    teamId,
    goToMember,
    goToMemberListModal,
    goToEventsListModal,
    goToEvent,
    goToCakesListModal,
    goToCreateCakeModal,
  } = props;

  // Team
  const team = useAgile(core.team.TEAMS.getItemById(teamId || ""));

  //======================================================================================================================
  // Render
  //======================================================================================================================

  if (team) {
    return (
      <Container>
        <MembersView
          teamId={teamId}
          goToMember={goToMember}
          goToMemberListModal={goToMemberListModal}
        />
        <EventsView
          teamId={teamId}
          goToEventsListModal={goToEventsListModal}
          goToEvent={goToEvent}
        />
        <CakesView
          teamId={teamId}
          goToCakesListModal={goToCakesListModal}
          goToCreateCakeModal={goToCreateCakeModal}
        />
      </Container>
    );
  }

  return null;
};

//======================================================================================================================
// Styles
//======================================================================================================================

const Container = styled.View<{ theme: ThemeInterface }>`
  background-color: ${(props) => props.theme.colors.background};
  padding-bottom: 200px;
`;

export default BottomView;

import React, { useCallback, useContext, useEffect, useState } from "react";
import { Animated, ScrollView } from "react-native";
import Headerbar from "../../../../navigation/components/Headerbar";
import { useNavigation, useRoute } from "@react-navigation/native";
import core from "../../../../src/core";
import CFullScreenInfo from "../../../components/project/cFullScreenInfo";
import HeaderView from "./components/HeaderView";
import BottomView from "./components/BottomView";
import MoreButton from "./components/HeaderView/components/MoreButton";
import * as controller from "./controller";
import { DropDownHolder } from "../../../components/project/DropDownHolder";
import styled from "styled-components/native";
import { withInteractionsManaged } from "../../../../navigation/helper/with-interactions-managed";
import NavigationLoadingScreen from "../../../../navigation/components/NavigationLoadingScreen";
import { useAgile } from "@agile-ts/react";
import { MemberInterface } from "../../../../src/core/controllers/member/member.interface";
import ThemeContext from "../../../../context/ThemeContext";

interface Props {}

const TeamScreen: React.FC<Props> = (props) => {
  // Navigation
  const navigation = useNavigation();
  const route = useRoute();
  const goToMember = (memberId: string, teamId: string) =>
    navigation.navigate("Member", {
      memberId: memberId,
      teamId: teamId,
    });
  const goToFullDescriptionModal = (description: string) =>
    navigation.navigate("FullDescriptionModal", { description: description });
  const goToEditTeamModal = (id: string | null) =>
    navigation.navigate("EditTeamModal", { teamId: id });
  const goToTeamList = () => navigation.navigate("TeamList");
  const goToMemberListModal = (teamId: string, search: boolean) =>
    navigation.navigate("MembersListModal", {
      search: search,
      teamId: teamId,
    });
  const goToEventsListModal = (teamId: string, search: boolean) =>
    navigation.navigate("EventsListModal", {
      search: search,
      teamId: teamId,
    });
  const goToEvent = (eventId: string, screen: string) =>
    navigation.navigate(screen, { eventId: eventId });
  const goToCakesListModal = (teamId: string) =>
    navigation.navigate("CakesListModal", { teamId: teamId });
  const goToCreateCakeModal = (cakeId: string) =>
    navigation.navigate("CreateCakeModal", { cakeId: cakeId });

  // Theme
  const theme = useContext(ThemeContext);

  // Team
  const teamId: string | null = route.params?.teamId || null;
  const team = useAgile(core.team.TEAMS.getItemById(teamId || ""));
  const teamImage = useAgile(
    core.image.IMAGES.getItemById(team?.teamData.imageId || "")
  );
  const [leftTeam, setLeftTeam] = useState<boolean>(false);
  const [removedTeam, setRemovedTeam] = useState<boolean>(false);

  // User Member
  const userMember: MemberInterface | null = core.team.getUserMember(
    teamId || ""
  );

  // ScrollView
  const scrollY = new Animated.Value(0);

  // Language
  useAgile([core.other.LANGUAGE]);

  //======================================================================================================================
  // Handle removed stuff
  //======================================================================================================================

  useEffect(() => {
    if (!userMember && team && !leftTeam) {
      DropDownHolder.dropDown?.alertWithType(
        "info",
        "Info",
        "You got kicked from ${teamName}!".replace(
          "${teamName}",
          team?.teamData.name || "unknown"
        )
      );
      goToTeamList();
    }
  }, [userMember]);

  useEffect(() => {
    if (!team && !removedTeam) {
      DropDownHolder.dropDown?.alertWithType(
        "info",
        "Info",
        "It looks like that this team doesn't exist anymore"
      );
      goToTeamList();
    }
  }, [team]);

  //======================================================================================================================
  // Animation
  //======================================================================================================================

  const headerColorAnimation = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [
      "rgba(0,0,0,0.0)",
      (teamImage &&
        "color" in teamImage.imageData &&
        core.helper.color.LightenDarkenColor(
          teamImage.imageData.color,
          -110
        )) ||
        theme.colors.primary,
    ],
    extrapolate: "clamp",
  });

  //======================================================================================================================
  // Header
  //======================================================================================================================

  useEffect(() => {
    if (team) {
      navigation.setOptions({
        headerShown: true,
        header: (props: any) => {
          return (
            <Headerbar
              {...props}
              title={team.teamData.name}
              backgroundColor={headerColorAnimation}
              color={"white"}
              rightElement={
                <MoreButton
                  teamId={teamId || ""}
                  onRemove={
                    userMember?.memberData.role === "creator"
                      ? onRemoveTeam
                      : undefined
                  }
                  onEdit={
                    userMember?.memberData.role === "creator"
                      ? (id: string) => goToEditTeamModal(id)
                      : undefined
                  }
                  onLeave={(id: string) =>
                    onLeaveTeam(id, userMember?.id || "")
                  }
                />
              }
              backArrow
              absolute
            />
          );
        },
      });
    }
  }, [team, userMember]);

  //======================================================================================================================
  // On Remove Team
  //======================================================================================================================

  const onRemoveTeam = useCallback(
    async (id: string) => {
      setRemovedTeam(true);

      // Remove Team
      const removeTeamResponse = await controller.removeTeam(id);

      // Success Drop Down
      if (removeTeamResponse !== null && "success" in removeTeamResponse) {
        DropDownHolder.dropDown?.alertWithType(
          "success",
          removeTeamResponse.success.title || "Success",
          removeTeamResponse.success.message
        );
        goToTeamList();
      }

      // Error Drop Down
      if (removeTeamResponse !== null && "error" in removeTeamResponse) {
        DropDownHolder.dropDown?.alertWithType(
          "error",
          "Error",
          removeTeamResponse.error.message
        );
        setRemovedTeam(false);
      }
    },
    [controller.removeTeam]
  );

  //======================================================================================================================
  // On Leave Team
  //======================================================================================================================

  const onLeaveTeam = useCallback(
    async (id: string, memberId: string) => {
      setLeftTeam(true);

      // Remove Team
      const leaveTeamResponse = await controller.leaveTeam(id, memberId);

      // Success Drop Down
      if (leaveTeamResponse !== null && "success" in leaveTeamResponse) {
        DropDownHolder.dropDown?.alertWithType(
          "success",
          leaveTeamResponse.success.title || "Success",
          leaveTeamResponse.success.message
        );
        goToTeamList();
      }

      // Error Drop Down
      if (leaveTeamResponse !== null && "error" in leaveTeamResponse) {
        DropDownHolder.dropDown?.alertWithType(
          "error",
          "Error",
          leaveTeamResponse.error.message
        );
        setLeftTeam(false);
      }
    },
    [userMember, controller.leaveTeam]
  );

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <Container>
      {team ? (
        <ScrollView
          onScroll={Animated.event(
            [
              {
                nativeEvent: { contentOffset: { y: scrollY } },
              },
            ],
            {
              useNativeDriver: false,
            }
          )}
          contentContainerStyle={{ flexGrow: 1 }}
          scrollEventThrottle={1}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <HeaderView
            teamId={teamId}
            onShowFullDescription={() =>
              goToFullDescriptionModal(team.teamData.description)
            }
          />
          <BottomView
            teamId={teamId}
            goToMember={goToMember}
            goToMemberListModal={goToMemberListModal}
            goToEventsListModal={goToEventsListModal}
            goToEvent={goToEvent}
            goToCakesListModal={goToCakesListModal}
            goToCreateCakeModal={goToCreateCakeModal}
          />
        </ScrollView>
      ) : (
        <CFullScreenInfo error />
      )}
    </Container>
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const Container = styled.View`
  flex: 1;
`;

export default withInteractionsManaged(TeamScreen, NavigationLoadingScreen);

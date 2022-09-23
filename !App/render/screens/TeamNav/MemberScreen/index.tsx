import React, { useCallback, useContext, useEffect } from "react";
import { View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Headerbar from "../../../../navigation/components/Headerbar";
import core from "../../../../src/core";
import * as controller from "./controller";
import { DropDownHolder } from "../../../components/project/DropDownHolder";
import MoreButton from "./components/MoreButton";
import styled from "styled-components/native";
import CFullScreenInfo from "../../../components/project/cFullScreenInfo";
import BottomView from "./components/BottomView";
import HeaderView from "./components/HeaderView";
import AddButton from "./components/AddButton";
import { withInteractionsManaged } from "../../../../navigation/helper/with-interactions-managed";
import NavigationLoadingScreen from "../../../../navigation/components/NavigationLoadingScreen";
import { useAgile } from "@agile-ts/react";
import { MemberInterface } from "../../../../src/core/controllers/member/member.interface";
import { ThemeInterface } from "../../../../src/core/controllers/ui/interfaces";
import ThemeContext from "../../../../context/ThemeContext";

interface props {}

const MemberScreen: React.FC<props> = (props) => {
  // Navigation
  const navigation = useNavigation();
  const route = useRoute();
  const goBack = () => navigation.goBack();
  const goToAddDashModal = (memberId: string, teamId: string) =>
    navigation.navigate("AddDashModal", { memberId: memberId, teamId: teamId });
  const goToTeamList = () => navigation.navigate("TeamList");

  // Theme
  const theme = useContext(ThemeContext);

  // Member
  const memberId: string | null = route.params?.memberId || null;
  const member = useAgile(core.member.MEMBERS.getItemById(memberId || ""));

  // Team
  const teamId: string | null = route.params?.teamId || null;
  const team = useAgile(core.team.TEAMS.getItemById(teamId || ""));

  // User Member
  const userMember: MemberInterface | null = core.team.getUserMember(
    teamId || ""
  );

  //======================================================================================================================
  // Handle removed stuff
  //======================================================================================================================

  useEffect(() => {
    if (!userMember && team) {
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
    if (!team) {
      DropDownHolder.dropDown?.alertWithType(
        "info",
        "Info",
        "It looks like that this team doesn't exist anymore"
      );
      goToTeamList();
    }
  }, [team]);

  //======================================================================================================================
  // Header
  //======================================================================================================================

  useEffect(() => {
    if (member) {
      navigation.setOptions({
        headerShown: true,
        header: (props: any) => {
          return (
            <Headerbar
              {...props}
              title={member.memberData.name}
              backgroundColor={theme.colors.primary}
              color={theme.colors.on_primary}
              // If member has no kick right he has no rights at all
              rightElement={
                controller.canBeKicked(member, userMember) && (
                  <MoreButton
                    member={member}
                    onKick={
                      controller.canBeKicked(member, userMember)
                        ? onKickMember
                        : undefined
                    }
                    onAdmin={
                      controller.canBeAdmin(member, userMember)
                        ? onAdminMember
                        : undefined
                    }
                    onCreator={
                      controller.canBeCreator(member, userMember)
                        ? onCreatorMember
                        : undefined
                    }
                  />
                )
              }
              backArrow
            />
          );
        },
      });
    }
  }, [member]);

  //======================================================================================================================
  // On Kick Member
  //======================================================================================================================

  const onKickMember = useCallback(
    async (id: string) => {
      // Kick Member
      const kickMemberResponse = await controller.kickMember(id);

      // Success Drop Down
      if (kickMemberResponse !== null && "success" in kickMemberResponse) {
        DropDownHolder.dropDown?.alertWithType(
          "success",
          kickMemberResponse.success.title || "Success",
          kickMemberResponse.success.message
        );
        goBack();
      }

      // Error Drop Down
      if (kickMemberResponse !== null && "error" in kickMemberResponse)
        DropDownHolder.dropDown?.alertWithType(
          "error",
          "Error",
          kickMemberResponse.error.message
        );
    },
    [controller.kickMember]
  );

  //======================================================================================================================
  // On Owner Member
  //======================================================================================================================

  const onCreatorMember = useCallback(
    async (id: string) => {
      // Make Member To Creator
      const ownerMemberResponse = await controller.makeMemberToCreator(id);

      // Success Drop Down
      if (ownerMemberResponse !== null && "success" in ownerMemberResponse)
        DropDownHolder.dropDown?.alertWithType(
          "success",
          ownerMemberResponse.success.title || "Success",
          ownerMemberResponse.success.message
        );

      // Error Drop Down
      if (ownerMemberResponse !== null && "error" in ownerMemberResponse)
        DropDownHolder.dropDown?.alertWithType(
          "error",
          "Error",
          ownerMemberResponse.error.message
        );
    },
    [controller.makeMemberToCreator]
  );

  //======================================================================================================================
  // On Admin Member
  //======================================================================================================================

  const onAdminMember = useCallback(
    async (id: string, admin: boolean) => {
      // Update Member Admin
      const adminMemberResponse = await controller.updateMemberAdmin(id, admin);

      // Success Drop Down
      if (adminMemberResponse !== null && "success" in adminMemberResponse)
        DropDownHolder.dropDown?.alertWithType(
          "success",
          adminMemberResponse.success.title || "Success",
          adminMemberResponse.success.message
        );

      // Error Drop Down
      if (adminMemberResponse !== null && "error" in adminMemberResponse)
        DropDownHolder.dropDown?.alertWithType(
          "error",
          "Error",
          adminMemberResponse.error.message
        );
    },
    [controller.updateMemberAdmin]
  );

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <Container>
      {member ? (
        <View style={{ flex: 1 }}>
          <HeaderView memberId={memberId || ""} />
          <BottomView memberId={memberId || ""} />
          {userMember && userMember.id !== memberId && (
            <AddButton
              member={member}
              onAddDash={() => goToAddDashModal(memberId || "", teamId || "")}
            />
          )}
        </View>
      ) : (
        <CFullScreenInfo error />
      )}
    </Container>
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const Container = styled.SafeAreaView<{ theme: ThemeInterface }>`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
`;

export default withInteractionsManaged(MemberScreen, NavigationLoadingScreen);

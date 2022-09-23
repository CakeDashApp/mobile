import React, { useCallback, useEffect, useState } from "react";
import core from "../../../../src/core";
import * as controller from "./controller";
import { useNavigation, useRoute } from "@react-navigation/native";
import CTabRow, { TagInterface } from "../../../components/project/cTabRow";
import CSectionModal from "../../../components/project/cSectionModal";
import styled from "styled-components/native";
import MembersView from "./components/MembersView";
import NoMembersView from "./components/NoMembersView";
import strings from "./strings";
import { DropDownHolder } from "../../../components/project/DropDownHolder";
import { withInteractionsManaged } from "../../../../navigation/helper/with-interactions-managed";
import NavigationLoadingScreen from "../../../../navigation/components/NavigationLoadingScreen";
import { MemberInterface } from "../../../../src/core/controllers/member/member.interface";
import { useAgile } from "@agile-ts/react";

interface Props {}

const MembersListModal: React.FC<Props> = (props) => {
  // Navigation
  const navigation = useNavigation();
  const route = useRoute();
  const goBack = () => navigation.goBack();
  const goToMember = (memberId: string, teamId: string) =>
    navigation.navigate("Member", { memberId: memberId, teamId: teamId });

  // Team
  const teamId: string | null = route.params?.teamId || null;

  // Members
  const [filteredMembers, setFilteredMembers] = useState<MemberInterface[]>([]);
  const members = useAgile(core.member.MEMBERS.getGroup(teamId || ""));

  // Tag
  const [currentTag, setCurrentTag] = useState<string | number>(
    controller.ALL_TAG
  );

  // Search
  const search: boolean = route.params?.search || false;

  //======================================================================================================================
  // Set Start Tag
  //======================================================================================================================

  useEffect(() => {
    setFilteredMembers(controller.filterMembers(currentTag, members));
  }, [members]);

  //======================================================================================================================
  // On Kick Member
  //======================================================================================================================

  const onKickMember = useCallback(
    async (id: string) => {
      // Kick Member
      const kickMemberResponse = await controller.kickMember(id);

      // Success Drop Down
      if (kickMemberResponse !== null && "success" in kickMemberResponse)
        DropDownHolder.dropDown?.alertWithType(
          "success",
          kickMemberResponse.success.title || "Success",
          kickMemberResponse.success.message
        );

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
  // On Tag Changed
  //======================================================================================================================

  const onTagChanged = useCallback(
    (tag: TagInterface) => {
      setCurrentTag(tag.key);
      setFilteredMembers(controller.filterMembers(tag.key, members));
    },
    [members]
  );

  //======================================================================================================================
  // On Search Value Changed
  //======================================================================================================================

  const onSearchValueChanged = useCallback(
    async (value: string | null) => {
      if (value !== null) {
        setFilteredMembers(
          controller.filterMembers(
            currentTag,
            members.filter((event) => event.memberData.name.startsWith(value))
          )
        );
      } else setFilteredMembers(controller.filterMembers(currentTag, members));
    },
    [currentTag, members]
  );

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <CSectionModal
      sections={[
        {
          key: 1,
          content: (
            <Container>
              <CTabRow
                tags={[
                  { key: controller.ALL_TAG, label: "All" },
                  { key: controller.ADMIN_TAG, label: "Admin" },
                ]}
                onTagChanged={onTagChanged}
                searchTag={{
                  initialFocused: search,
                }}
                onSearchValueChanged={onSearchValueChanged}
              />
              {filteredMembers.length > 0 ? (
                <MembersView
                  members={filteredMembers}
                  teamId={teamId || ""}
                  onPressMember={goToMember}
                  onKickMember={onKickMember}
                  onAdminMember={onAdminMember}
                  onCreatorMember={onCreatorMember}
                />
              ) : (
                <NoMembersView />
              )}
            </Container>
          ),
          name: strings().membersTitle,
          icon: { type: "users", iconStroke: 2 },
        },
      ]}
      onGoBack={goBack}
      backButton
      scrollView={false}
    />
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const Container = styled.View`
  height: 100%;
`;

export default withInteractionsManaged(
  MembersListModal,
  NavigationLoadingScreen
);

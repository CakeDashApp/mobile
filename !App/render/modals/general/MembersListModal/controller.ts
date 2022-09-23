import { SuccessInterface } from "../../../../src/core/interfaces/success.interface";
import core from "../../../../src/core";
import {
  kickMemberAlert,
  makeMemberToCreatorAlert,
  updateAdminAlert,
} from "./alerts";
import strings from "./strings";
import { MemberInterface } from "../../../../src/core/controllers/member/member.interface";
import { ErrorInterface } from "../../../../src/core/controllers/error/error.interface";

// Tags
export const ADMIN_TAG = "admin";
export const ALL_TAG = "all";

//======================================================================================================================
// Filter Members
//======================================================================================================================

export const filterMembers = (
  tagKey: string | number,
  members: MemberInterface[]
): MemberInterface[] => {
  let filteredMembers: MemberInterface[] = [];

  // Filter Teams
  switch (tagKey) {
    case ALL_TAG:
      filteredMembers = members;
      break;

    case ADMIN_TAG:
      filteredMembers = members.filter(
        (member) =>
          member.memberData.role === "admin" ||
          member.memberData.role === "creator"
      );
      break;
  }

  return filteredMembers;
};

//======================================================================================================================
// Kick Member
//======================================================================================================================

export const kickMember = async (
  id: string
): Promise<ErrorInterface | SuccessInterface | null> => {
  // Get Member Name
  const member = await core.member.fetchMember(id);
  let memberName = "unknown";
  if (!("error" in member)) memberName = member.memberData.name;

  // Alert
  const alertResponse: "YES" | "NO" = await kickMemberAlert(memberName);

  // Kick Member
  if (alertResponse === "YES") {
    const leaveTeamResponse = await core.team.leaveTeam(id);
    return (
      leaveTeamResponse || {
        success: {
          title: strings().kickMemberSuccessTitle,
          message: strings().kickMemberSuccessText.replace(
            "${name}",
            memberName
          ),
        },
      }
    );
  }

  return null;
};

//======================================================================================================================
// Make Member To Owner
//======================================================================================================================

export const makeMemberToCreator = async (
  id: string
): Promise<ErrorInterface | SuccessInterface | null> => {
  // Get Member Name
  const member = await core.member.fetchMember(id);
  let memberName = "unknown";
  if (!("error" in member)) memberName = member.memberData.name;

  // Alert
  const alertResponse: "YES" | "NO" = await makeMemberToCreatorAlert(
    memberName
  );

  // Make Member to Creator
  if (alertResponse === "YES") {
    const updatedMemberResponse = await core.member.setMemberCreator(id, true);
    return (
      ("error" in updatedMemberResponse && updatedMemberResponse) || {
        success: {
          title: strings().madeMemberToCreatorSuccessTitle,
          message: strings().madeMemberToCreatorSuccessText.replace(
            "${name}",
            memberName
          ),
        },
      }
    );
  }

  return null;
};

//======================================================================================================================
// Update Member Admin
//======================================================================================================================

export const updateMemberAdmin = async (
  id: string,
  admin: boolean
): Promise<ErrorInterface | SuccessInterface | null> => {
  // Get Member Name
  const member = await core.member.fetchMember(id);
  let memberName = "unknown";
  if (!("error" in member)) memberName = member.memberData.name;

  // Alert
  const alertResponse: "YES" | "NO" = await updateAdminAlert(memberName, admin);

  // Update Member Admin
  if (alertResponse === "YES") {
    const updatedMemberResponse = await core.member.setMemberAdmin(id, admin);
    return (
      ("error" in updatedMemberResponse && updatedMemberResponse) || {
        success: {
          title: admin
            ? strings().addedMemberToAdminSuccessTitle
            : strings().removedMemberFromAdminSuccessTitle,
          message: admin
            ? strings().addedMemberToAdminSuccessText.replace(
                "${name}",
                memberName
              )
            : strings().removedMemberFromAdminSuccessText.replace(
                "${name}",
                memberName
              ),
        },
      }
    );
  }

  return null;
};

//======================================================================================================================
// Can be Kicked
//======================================================================================================================

export const canBeKicked = (
  kickMember: MemberInterface,
  userMember: MemberInterface | null
): boolean => {
  if (kickMember.id === userMember?.id) return false;
  if (
    kickMember.memberData.role === "admin" &&
    userMember?.memberData.role === "admin"
  )
    return false;
  if (kickMember?.memberData.role === "creator") return false;

  return true;
};

//======================================================================================================================
// Can be Admin
//======================================================================================================================

export const canBeAdmin = (
  adminMember: MemberInterface,
  userMember: MemberInterface | null
): boolean => {
  if (adminMember.id === userMember?.id) return false;
  if (userMember?.memberData.role === "admin") return false;
  if (adminMember.memberData.role === "creator") return false;

  return true;
};

//======================================================================================================================
// Can be Creator
//======================================================================================================================

export const canBeCreator = (
  creatorMember: MemberInterface,
  userMember: MemberInterface | null
): boolean => {
  if (creatorMember.id === userMember?.id) return false;
  if (creatorMember.memberData.role === "member") return false;
  if (userMember?.memberData.role === "admin") return false;
  if (userMember?.memberData.role === "member") return false;

  return true;
};

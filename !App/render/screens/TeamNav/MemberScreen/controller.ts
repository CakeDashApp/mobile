import * as alerts from "./alerts";
import strings from "./strings";
import { SuccessInterface } from "../../../../src/core/interfaces/success.interface";
import core from "../../../../src/core";
import { ErrorInterface } from "../../../../src/core/controllers/error/error.interface";
import { MemberInterface } from "../../../../src/core/controllers/member/member.interface";

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
  const alertResponse: "YES" | "NO" = await alerts.kickMemberAlert(memberName);

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
  const alertResponse: "YES" | "NO" = await alerts.makeMemberToCreatorAlert(
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
  const alertResponse: "YES" | "NO" = await alerts.updateAdminAlert(
    memberName,
    admin
  );

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

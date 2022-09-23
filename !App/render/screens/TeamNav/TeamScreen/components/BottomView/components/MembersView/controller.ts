import { MemberInterface } from "../../../../../../../../src/core/controllers/member/member.interface";

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

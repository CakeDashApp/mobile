import {
  EventInterface,
  EventListItemDataInterface,
  EventListItemInterface,
} from "../../event.interface";
import { createEvent } from "../../event.actions";
import strings from "./strings";
import { maxNameLength } from "../../event.manager";
import { shortText } from "../../../../helper/general/text.helper";
import { ErrorInterface } from "../../../error/error.interface";
import { fetchMember } from "../../../member/member.actions";

export const LeaveTeamEvent = async (
  teamId: string,
  memberId: string
): Promise<EventInterface | ErrorInterface> => {
  // Get MemberName and ImageId
  let imageId: string | null = null;
  let memberName: string = "unknown";
  const member = await fetchMember(memberId);
  if (!("error" in member)) {
    imageId = member.memberData.imageId;
    memberName = member.memberData.name;
  }

  // Create Event
  return await createEvent(
    teamId,
    null, // Event shouldn't be deleted if member leave team
    "leaveTeamEvent",
    24,
    {
      memberId: memberId,
      imageId: imageId || "",
      memberName: memberName,
    }
  );
};

export const getLeaveTeamEventListItem = async (
  listItemData: EventListItemDataInterface
): Promise<EventListItemInterface> => {
  // Data
  const memberId: string = listItemData.memberId || "";
  const oldImageId: string = listItemData.imageId || "";
  const oldMemberName: string = listItemData.memberName || "unknown";

  // Get ImageId and MemberName
  let imageId: string | null = oldImageId;
  let memberName: string = oldMemberName;
  const member = await fetchMember(memberId);
  if (!("error" in member)) {
    imageId = member.memberData.imageId;
    memberName = member.memberData.name;
  }

  return {
    imageId: imageId,
    title: strings().eventText.replace(
      "${member}",
      shortText(memberName, maxNameLength)
    ),
    labelType: "info",
  };
};

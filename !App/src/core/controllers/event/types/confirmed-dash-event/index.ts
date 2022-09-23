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

export const ConfirmedDashEvent = async (
  teamId: string,
  dashReceiverId: string
): Promise<EventInterface | ErrorInterface> => {
  return await createEvent(teamId, dashReceiverId, "confirmedDashEvent", 24, {
    dashReceiverId: dashReceiverId,
  });
};

export const getConfirmedDashEventListItem = async (
  listItemData: EventListItemDataInterface
): Promise<EventListItemInterface> => {
  // Data
  const dashReceiverId: string = listItemData.dashReceiverId || "";

  // Get ImageId and MemberName
  let imageId: string | null = null;
  let memberName: string = "unknown";
  const dashReceiver = await fetchMember(dashReceiverId);
  if (!("error" in dashReceiver)) {
    imageId = dashReceiver.memberData.imageId;
    memberName = dashReceiver.memberData.name;
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

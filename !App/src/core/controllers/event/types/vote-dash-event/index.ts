import {
  EventInterface,
  EventListItemDataInterface,
  EventListItemInterface,
} from "../../event.interface";
import { createEvent } from "../../event.actions";
import { maxNameLength } from "../../event.manager";
import strings from "../add-dash-event/strings";
import { VoteDashEventInfoInterface } from "./interface";
import { shortText } from "../../../../helper/general/text.helper";
import { ErrorInterface } from "../../../error/error.interface";
import { fetchMember } from "../../../member/member.actions";

export const VoteDashEvent = async (
  teamId: string,
  dashReceiverId: string,
  dashGiverId: string,
  voteTitle: string,
  voteDescription: string,
  votesNeeded: number
): Promise<EventInterface | ErrorInterface> => {
  const eventInfo: VoteDashEventInfoInterface = {
    data: {
      title: voteTitle,
      description: voteDescription,
    },
    votes: {
      votesNeeded: votesNeeded,
      confirmedVotes: 0,
      rejectedVotes: 0,
      votedMemberIds: [],
    },
    dashGiverId: dashGiverId,
    dashReceiverId: dashReceiverId,
  };

  return await createEvent(
    teamId,
    dashReceiverId,
    "voteDashEvent",
    24,
    {
      dashReceiverId: dashReceiverId,
    },
    eventInfo,
    {
      screen: "VoteDashEventModal",
    }
  );
};

export const getVoteDashEventListItem = async (
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
    labelType: "vote",
  };
};

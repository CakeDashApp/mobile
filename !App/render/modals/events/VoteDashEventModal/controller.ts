import core from "../../../../src/core";
import { InfoInterface } from "../../../../src/core/interfaces/info.interface";
import { SuccessInterface } from "../../../../src/core/interfaces/success.interface";
import strings from "./strings";
import { VoteDashEventInfoInterface } from "../../../../src/core/controllers/event/types/vote-dash-event/interface";
import { ErrorInterface } from "../../../../src/core/controllers/error/error.interface";

//======================================================================================================================
// Vote
//======================================================================================================================

export const vote = async (
  eventId: string,
  memberId: string | undefined,
  confirm: boolean,
  info: VoteDashEventInfoInterface
): Promise<ErrorInterface | SuccessInterface | InfoInterface> => {
  if (!memberId)
    return {
      error: {
        type: "other",
        message: "Failed to fetch Member!",
        e: null,
      },
    };

  // New Info
  const newInfo: VoteDashEventInfoInterface = { ...info };
  newInfo.votes.votedMemberIds = newInfo.votes.votedMemberIds || [];

  // Error if member has already voted
  if (newInfo.votes.votedMemberIds.includes(memberId))
    return {
      info: {
        title: strings().alreadyVotedInfoTitle,
        message: strings().alreadyVotedInfoText,
      },
    };

  // Update Votes
  if (confirm) newInfo.votes.confirmedVotes += 1;
  else newInfo.votes.rejectedVotes += 1;
  newInfo.votes.votedMemberIds.push(memberId);

  const updatedEvent = await core.event.setEventInfo(eventId, newInfo);
  if ("error" in updatedEvent) return updatedEvent;

  return {
    success: {
      title: confirm
        ? strings().confirmVoteSuccessTitle
        : strings().rejectVoteSuccessTitle,
      message: confirm
        ? strings().confirmVoteSuccessText
        : strings().rejectVoteSuccessText,
    },
  };
};

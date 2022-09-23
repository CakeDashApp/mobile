import { SuccessInterface } from "../../../../src/core/interfaces/success.interface";
import { InfoInterface } from "../../../../src/core/interfaces/info.interface";
import strings from "./strings";
import core from "../../../../src/core";
import { BringCakeEventInfoInterface } from "../../../../src/core/controllers/event/types/bring-cake-event/interface";
import { ErrorInterface } from "../../../../src/core/controllers/error/error.interface";

//======================================================================================================================
// Vote
//======================================================================================================================

export const vote = async (
  eventId: string,
  memberId: string | undefined,
  confirm: boolean,
  info: BringCakeEventInfoInterface
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
  const newInfo: BringCakeEventInfoInterface = { ...info };
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

//======================================================================================================================
// Rate
//======================================================================================================================

export const rate = async (
  eventId: string,
  memberId: string | undefined,
  rating: number,
  info: BringCakeEventInfoInterface
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
  const newInfo: BringCakeEventInfoInterface = { ...info };
  newInfo.ratings.ratedMemberIds = newInfo.ratings.ratedMemberIds || [];
  console.log(newInfo);

  // Error if member has already voted
  if (newInfo.ratings.ratedMemberIds.includes(memberId))
    return {
      info: {
        title: strings().alreadyRatedInfoTitle,
        message: strings().alreadyRatedInfoText,
      },
    };

  // Update Ratings
  newInfo.ratings.ratingAverage =
    (newInfo.ratings.ratingAverage * newInfo.ratings.ratedMemberIds.length +
      rating) /
    (newInfo.ratings.ratedMemberIds.length + 1);
  newInfo.ratings.ratedMemberIds.push(memberId);

  const updatedEvent = await core.event.setEventInfo(eventId, newInfo);
  if ("error" in updatedEvent) return updatedEvent;

  return {
    success: {
      title: strings().rateSuccessTitle,
      message: strings().rateSuccessText,
    },
  };
};

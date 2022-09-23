import {
  EventInterface,
  EventListItemDataInterface,
  EventListItemInterface,
} from "../../event.interface";
import { createEvent } from "../../event.actions";
import { BringCakeEventInfoInterface } from "./interface";
import { maxNameLength } from "../../event.manager";
import strings from "./strings";
import { shortText } from "../../../../helper/general/text.helper";
import { ErrorInterface } from "../../../error/error.interface";
import { fetchCake } from "../../../cake/cake.actions";
import { fetchMember } from "../../../member/member.actions";

export const BringCakeEvent = async (
  teamId: string,
  cakeBringerId: string,
  cakeId: string,
  cakeDescription: string,
  cakeName: string,
  cakeImageIds: string[],
  neededVotes: number
): Promise<EventInterface | ErrorInterface> => {
  const eventInfo: BringCakeEventInfoInterface = {
    cakeId: cakeId,
    cakeBringerId: cakeBringerId,
    data: {
      title: cakeName,
      description: cakeDescription,
      imageIds: cakeImageIds,
    },
    ratings: {
      ratedMemberIds: [],
      ratingAverage: 0,
    },
    votes: {
      votesNeeded: neededVotes,
      confirmedVotes: 0,
      rejectedVotes: 0,
      votedMemberIds: [],
    },
  };

  return await createEvent(
    teamId,
    cakeBringerId,
    "bringCakeEvent",
    24,
    {
      cakeBringerId: cakeBringerId,
      cakeId: cakeId,
    },
    eventInfo,
    {
      screen: "BringCakeEventModal",
    }
  );
};

export const getBringCakeEventListItem = async (
  listItemData: EventListItemDataInterface
): Promise<EventListItemInterface> => {
  // Data
  const cakeBringerId: string = listItemData.cakeBringerId || "";
  const cakeId: string = listItemData.cakeId || "";

  // Get ImageId and MemberName
  let imageId: string | null = null;
  let memberName: string = "unknown";
  const cakeBringer = await fetchMember(cakeBringerId);
  if (!("error" in cakeBringer)) {
    imageId = cakeBringer.memberData.imageId;
    memberName = cakeBringer.memberData.name;
  }

  // Get Cake Name
  let cakeName: string = "unknown";
  const cake = await fetchCake(cakeId);
  if (!("error" in cake)) cakeName = cake.cakeData.product.name;

  return {
    title: strings()
      .eventText.replace("${member}", shortText(memberName, maxNameLength))
      .replace("${product}", shortText(cakeName, 15)),
    imageId: imageId,
    labelType: "cake",
  };
};

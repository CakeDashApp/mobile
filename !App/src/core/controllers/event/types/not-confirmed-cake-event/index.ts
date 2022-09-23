import {
  EventInterface,
  EventListItemDataInterface,
  EventListItemInterface,
} from "../../event.interface";
import strings from "./strings";
import { createEvent } from "../../event.actions";
import { maxNameLength } from "../../event.manager";
import { shortText } from "../../../../helper/general/text.helper";
import { ErrorInterface } from "../../../error/error.interface";
import { fetchCake } from "../../../cake/cake.actions";
import { fetchMember } from "../../../member/member.actions";

export const NotConfirmedCakeEvent = async (
  teamId: string,
  cakeReceiverId: string,
  cakeId: string
): Promise<EventInterface | ErrorInterface> => {
  return await createEvent(
    teamId,
    cakeReceiverId,
    "notConfirmedCakeEvent",
    24,
    {
      cakeReceiverId: cakeReceiverId,
      cakeId: cakeId,
    }
  );
};

export const getNotConfirmedCakeEventListItem = async (
  listItemData: EventListItemDataInterface
): Promise<EventListItemInterface> => {
  // Data
  const cakeReceiverId: string = listItemData.cakeReceiverId || "";
  const cakeId: string = listItemData.cakeId || "";

  // Get ImageId and MemberName
  let imageId: string | null = null;
  let memberName: string = "unknown";
  const cakeReceiver = await fetchMember(cakeReceiverId);
  if (!("error" in cakeReceiver)) {
    imageId = cakeReceiver.memberData.imageId;
    memberName = cakeReceiver.memberData.name;
  }

  // Get Cake Name
  let cakeName: string = "unknown";
  const cake = await fetchCake(cakeId);
  if (!("error" in cake)) cakeName = cake.cakeData.product.name;

  return {
    imageId: imageId,
    title: strings()
      .eventText.replace("${member}", shortText(memberName, maxNameLength))
      .replace("${product}", shortText(cakeName, 10)),
    labelType: "info",
  };
};

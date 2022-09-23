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
import { fetchProduct } from "../../../product/product.actions";
import { fetchMember } from "../../../member/member.actions";

export const AddCakeEvent = async (
  teamId: string,
  cakeReceiverId: string,
  productId: string | null
): Promise<EventInterface | ErrorInterface> => {
  return await createEvent(teamId, cakeReceiverId, "addCakeEvent", 24, {
    cakeReceiverId: cakeReceiverId,
    productId: productId || "none",
  });
};

export const getAddCakeEventListItem = async (
  listItemData: EventListItemDataInterface
): Promise<EventListItemInterface> => {
  // Data
  const cakeReceiverId: string = listItemData.cakeReceiverId || "";
  const productId: string = listItemData.productId || "";

  // Get ImageId and MemberName
  let imageId: string | null = null;
  let memberName: string = "unknown";
  const cakeReceiver = await fetchMember(cakeReceiverId);
  if (!("error" in cakeReceiver)) {
    imageId = cakeReceiver.memberData.imageId;
    memberName = cakeReceiver.memberData.name;
  }

  // Get ProductName
  let productName = strings().randomProductName;
  const product = await fetchProduct(productId || "");
  if (!("error" in product)) productName = product.productData.name;

  return {
    imageId: imageId,
    title: strings()
      .eventText.replace("${member}", shortText(memberName, maxNameLength))
      .replace("${product}", shortText(productName, 15)),
    labelType: "info",
  };
};

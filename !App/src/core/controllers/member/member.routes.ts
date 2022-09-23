import { get, remove, update } from "../../api/firebase";
import {
  MemberProductInterface,
  MemberInterface,
  MemberStatsInterface,
  RoleType,
} from "./member.interface";
import { memberListener } from "./member.listener";
import { ErrorInterface } from "../error/error.interface";

export const FETCH_MEMBER = async (
  id: string,
  listener?: boolean
): Promise<MemberInterface | ErrorInterface> => {
  if (id === "")
    return {
      error: {
        message: "Failed to fetch Member by id " + id,
        type: "firebase",
        e: null,
      },
    };

  // Get FirebaseObject
  const firebaseObject = await get(`members/${id}`, true);
  if (!firebaseObject || "error" in firebaseObject)
    return {
      error: {
        message: "Failed to fetch Member by id " + id,
        type: "firebase",
        e: null,
      },
    };

  // Get Member & Ref
  const ref = firebaseObject.ref;
  const member = firebaseObject.responseData;
  if (!member)
    return {
      error: {
        message: "Failed to fetch Member by id " + id,
        type: "firebase",
        e: null,
      },
    };

  // Setup Listener
  if (listener) memberListener(ref);

  return member;
};

export const UPDATE_MEMBER = async (
  id: string,
  member: MemberInterface,
  listener?: boolean
): Promise<null | ErrorInterface> => {
  // Update Member
  const firebaseRef = await update(`members/${id}`, member, true);
  if (!firebaseRef || "error" in firebaseRef)
    return {
      error: {
        message: "Failed to update Member by id " + id,
        type: "firebase",
        e: null,
      },
    };

  // Setup Listener
  if (listener) memberListener(firebaseRef);

  return null;
};

export const UPDATE_MEMBER_NAME = async (
  id: string,
  name: string
): Promise<null | ErrorInterface> => {
  // Update Member Name
  let updateResponse = await update(`members/${id}/memberData`, { name: name });
  if (updateResponse && "error" in updateResponse)
    return {
      error: {
        message: "Failed to update Member Name by id " + id,
        type: "firebase",
        e: null,
      },
    };

  return null;
};

export const UPDATE_MEMBER_IMAGE_ID = async (
  id: string,
  imageId: string | null
): Promise<null | ErrorInterface> => {
  // Update Member ImageId
  let updateResponse = await update(`members/${id}/memberData`, {
    imageId: imageId,
  });
  if (updateResponse && "error" in updateResponse)
    return {
      error: {
        message: "Failed to update Member ImageId by id " + id,
        type: "firebase",
        e: null,
      },
    };

  return null;
};

export const UPDATE_MEMBER_CURRENT_PRODUCT = async (
  id: string,
  currentProduct: MemberProductInterface
): Promise<null | ErrorInterface> => {
  // Update Member Current Product
  let updateResponse = await update(`members/${id}/memberData`, {
    product: currentProduct,
  });
  if (updateResponse && "error" in updateResponse)
    return {
      error: {
        message: "Failed to update Member Current Product Id by id " + id,
        type: "firebase",
        e: null,
      },
    };

  return null;
};

export const UPDATE_MEMBER_ROLE = async (
  id: string,
  role: RoleType
): Promise<null | ErrorInterface> => {
  // Update Member Admin
  let updateResponse = await update(`members/${id}/memberData`, { role: role });
  if (updateResponse && "error" in updateResponse)
    return {
      error: {
        message: "Failed to update Member Admin by id " + id,
        type: "firebase",
        e: null,
      },
    };

  return null;
};

export const UPDATE_MEMBER_STATS = async (
  id: string,
  stats: MemberStatsInterface
): Promise<null | ErrorInterface> => {
  // Update Member Stats
  let updateResponse = await update(`members/${id}/memberData`, {
    stats: stats,
  });
  if (updateResponse && "error" in updateResponse)
    return {
      error: {
        message: "Failed to update Member Stats by id " + id,
        type: "firebase",
        e: null,
      },
    };

  return null;
};

export const UPDATE_MEMBER_CAKE_IDS = async (
  id: string,
  cakeIds: string[]
): Promise<null | ErrorInterface> => {
  // Update Member CakeIds
  let updateResponse = await update(`members/${id}`, { cakeIds: cakeIds });
  if (updateResponse && "error" in updateResponse)
    return {
      error: {
        message: "Failed to update Member CakeIds by id " + id,
        type: "firebase",
        e: null,
      },
    };

  return null;
};

export const UPDATE_MEMBER_EVENT_IDS = async (
  id: string,
  eventIds: string[]
): Promise<null | ErrorInterface> => {
  // Update Member EventIds
  let updateResponse = await update(`members/${id}`, { eventIds: eventIds });
  if (updateResponse && "error" in updateResponse)
    return {
      error: {
        message: "Failed to update Member EventIds by id " + id,
        type: "firebase",
        e: null,
      },
    };

  return null;
};

export const REMOVE_MEMBER = async (
  id: string
): Promise<null | ErrorInterface> => {
  // Remove Member
  let removeResponse = await remove(`members/${id}`);
  if (removeResponse && "error" in removeResponse)
    return {
      error: {
        message: "Failed to remove Member by id " + id,
        type: "firebase",
        e: null,
      },
    };

  return null;
};

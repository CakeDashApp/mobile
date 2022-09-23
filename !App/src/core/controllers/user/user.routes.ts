import { get, remove, update } from "../../api/firebase";
import {
  StatusType,
  UserInterface,
  UserStatsInterface,
} from "./user.interface";
import firebase from "../../api/firebase/config.firebase";
import { userListener } from "./user.listener";
import { ErrorInterface } from "../error/error.interface";

export const FETCH_USER = async (
  id: string,
  listener?: boolean
): Promise<UserInterface | ErrorInterface> => {
  if (id === "")
    return {
      error: {
        message: "Failed to fetch User by id " + id,
        type: "firebase",
        e: null,
      },
    };

  // Get FirebaseObject
  const firebaseObject = await get(`users/${id}`, true);
  if (!firebaseObject || "error" in firebaseObject)
    return {
      error: {
        message: "Failed to fetch User by id " + id,
        type: "firebase",
        e: null,
      },
    };

  // Get User & Ref
  const ref = firebaseObject.ref;
  const user = firebaseObject.responseData;
  if (!user)
    return {
      error: {
        message: "Failed to fetch User by id " + id,
        type: "firebase",
        e: null,
      },
    };

  // Setup Listener
  if (listener) userListener(ref);

  return user;
};

export const UPDATE_USER = async (
  id: string,
  user: UserInterface,
  listener?: boolean
): Promise<null | ErrorInterface> => {
  // Update User
  const firebaseRef = await update(`users/${id}`, user, true);
  if (!firebaseRef || "error" in firebaseRef)
    return {
      error: {
        message: "Failed to update User Data by id " + id,
        type: "firebase",
        e: null,
      },
    };

  // Setup Listener
  if (listener) userListener(firebaseRef);

  return null;
};

export const UPDATE_USER_NAME = async (
  id: string,
  name: string
): Promise<null | ErrorInterface> => {
  // Update User Name
  let updateResponse = await update(`users/${id}/userData`, { name: name });
  if (updateResponse && "error" in updateResponse)
    return {
      error: {
        message: "Failed to update User Name by id " + id,
        type: "firebase",
        e: null,
      },
    };

  return null;
};

export const UPDATE_USER_STATS = async (
  id: string,
  stats: UserStatsInterface
): Promise<null | ErrorInterface> => {
  // Update User Name
  let updateResponse = await update(`users/${id}/userData`, { stats: stats });
  if (updateResponse && "error" in updateResponse)
    return {
      error: {
        message: "Failed to update User Stats by id " + id,
        type: "firebase",
        e: null,
      },
    };

  return null;
};

export const UPDATE_USER_STATUS = async (
  id: string,
  status: StatusType
): Promise<null | ErrorInterface> => {
  // Update User Status
  let updateResponse = await update(`users/${id}/userData`, { status: status });
  if (updateResponse && "error" in updateResponse)
    return {
      error: {
        message: "Failed to update User Status by id " + id,
        type: "firebase",
        e: null,
      },
    };

  return null;
};

export const UPDATE_USER_IMAGE_ID = async (
  id: string,
  imageId: string | null
): Promise<null | ErrorInterface> => {
  // Update User ImageId
  let updateResponse = await update(`users/${id}/userData`, {
    imageId: imageId,
  });
  if (updateResponse && "error" in updateResponse)
    return {
      error: {
        message: "Failed to update User ImageId by id " + id,
        type: "firebase",
        e: null,
      },
    };

  return null;
};

export const UPDATE_USER_DESCRIPTION = async (
  id: string,
  description: string
): Promise<null | ErrorInterface> => {
  // Update User Description
  let updateResponse = await update(`users/${id}/userData`, {
    description: description,
  });
  if (updateResponse && "error" in updateResponse)
    return {
      error: {
        message: "Failed to update User Description by id " + id,
        type: "firebase",
        e: null,
      },
    };

  return null;
};

export const UPDATE_USER_MEMBER_IDS = async (
  id: string,
  memberIds: string[]
): Promise<null | ErrorInterface> => {
  // Update User MemberIds
  let updateResponse = await update(`users/${id}`, { memberIds: memberIds });
  if (updateResponse && "error" in updateResponse)
    return {
      error: {
        message: "Failed to update User MemberIds by id " + id,
        type: "firebase",
        e: null,
      },
    };

  return null;
};

export const REMOVE_USER = async (
  id: string
): Promise<null | ErrorInterface> => {
  // Remove User
  let removeResponse = await remove(`users/${id}`);
  if (removeResponse && "error" in removeResponse)
    return {
      error: {
        message: "Failed to remove User by id " + id,
        type: "firebase",
        e: null,
      },
    };

  return null;
};

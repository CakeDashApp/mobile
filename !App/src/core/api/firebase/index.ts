import { ErrorInterface } from "../../controllers/error/error.interface";
import { sendFirebaseLog } from "../../helper/general/logger.helper";
import Firebase from "./config.firebase";
import { AppState } from "react-native";
import { FirebaseDatabaseTypes } from "@react-native-firebase/database";
import core from "../../index";

//======================================================================================================================
//Get From Firebase
//======================================================================================================================

export const get = async (
  url: string,
  getRef?: boolean,
  limit?: number
): Promise<
  | ErrorInterface
  | { responseData: object; ref: FirebaseDatabaseTypes.Reference }
  | any
> => {
  sendFirebaseLog("Get " + url);
  try {
    // Create a reference
    let ref: any = Firebase.database().ref(url);

    if (limit) ref = Firebase.database().ref(url).limitToLast(limit);

    // Fetch the data snapshot
    const snapshot = await ref.once("value");

    // Get responseData
    const responseData = snapshot.val();

    sendFirebaseLog("End Get " + url);

    // Return with getRef
    if (getRef) {
      return {
        responseData: responseData,
        ref: ref,
      };
    }

    return responseData;
  } catch (e) {
    return {
      error: {
        type: "firebase",
        message: "Failed to get " + url,
        e: null,
      },
    };
  }
};

//======================================================================================================================
// Remove From Firebase
//======================================================================================================================

export const remove = async (url: string): Promise<ErrorInterface | null> => {
  sendFirebaseLog("Remove " + url);

  try {
    // Create a reference
    const ref = Firebase.database().ref(url);

    // Remove
    await ref.remove();

    sendFirebaseLog("End Remove " + url);
  } catch (e) {
    return {
      error: {
        type: "firebase",
        message: "Failed to remove " + url,
        e: null,
      },
    };
  }

  return null;
};

//======================================================================================================================
// Set To Firebase
//======================================================================================================================

export const set = async (
  url: string,
  set: object
): Promise<ErrorInterface | null> => {
  sendFirebaseLog("Set " + url);

  try {
    // Create a reference
    const ref = Firebase.database().ref(url);

    // Set Values
    await ref.set(set);

    sendFirebaseLog("End Set " + url);
  } catch (e) {
    return {
      error: {
        type: "firebase",
        message: "Failed to set " + url,
        e: null,
      },
    };
  }

  return null;
};

//======================================================================================================================
// Update Firebase
//======================================================================================================================

export const update = async (
  url: string,
  update: object,
  getRef?: boolean,
  log?: string
): Promise<ErrorInterface | FirebaseDatabaseTypes.Reference | null> => {
  sendFirebaseLog("Update " + url);

  try {
    // Create a reference
    const ref = Firebase.database().ref(url);

    //set Values
    await ref.update(update);

    sendFirebaseLog("End Update " + url);

    // Return Ref
    if (getRef) return ref;
  } catch (e) {
    return {
      error: {
        type: "firebase",
        message: "Failed to update " + url,
        e: null,
      },
    };
  }

  return null;
};

//======================================================================================================================
// Instantiate Status
//======================================================================================================================

export const instantiateStatus = () => {
  // Get UserId
  const userId = Firebase.auth().currentUser?.uid;
  if (userId) {
    // Create a reference
    const ref = Firebase.database().ref(`/users/${userId}/userData`);

    // Set to Online
    ref.update({ status: "online" });

    // Set to Offline whenever user get disconnected
    ref.onDisconnect().update({ status: "offline" });

    // Instantiate Event Listener
    AppState.addEventListener("change", handleAppStateChange);
  }
};

const handleAppStateChange = (nextAppState: any) => {
  const userId = core.auth.USER_ID.value;
  if (!userId) return;
  switch (nextAppState) {
    case "background":
      core.user.setUserStatus(userId, "away");
      break;
    case "inactive":
      core.user.setUserStatus(userId, "away");
      break;
    case "active":
      core.user.setUserStatus(userId, "online");
      break;
  }
};

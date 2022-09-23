import { get, remove, update } from "../../api/firebase";
import { EventInterface } from "./event.interface";
import { eventListener } from "./event.listener";
import { ErrorInterface } from "../error/error.interface";

export const FETCH_EVENT = async (
  id: string,
  listener?: boolean
): Promise<EventInterface | ErrorInterface> => {
  if (id === "")
    return {
      error: {
        message: "Failed to fetch Event by id " + id,
        type: "firebase",
        e: null,
      },
    };

  // Get FirebaseObject
  const firebaseObject = await get(`events/${id}`, true);
  if (!firebaseObject || "error" in firebaseObject)
    return {
      error: {
        message: "Failed to fetch Event by id " + id,
        type: "firebase",
        e: null,
      },
    };

  // Get Event & Ref
  const ref = firebaseObject.ref;
  const event = firebaseObject.responseData;
  if (!event)
    return {
      error: {
        message: "Failed to fetch Event by id " + id,
        type: "firebase",
        e: null,
      },
    };

  // Setup Listener
  if (listener) eventListener(ref);

  return event;
};

export const UPDATE_EVENT = async (
  id: string,
  event: EventInterface,
  listener?: boolean
): Promise<null | ErrorInterface> => {
  // Update Event
  const firebaseRef = await update(`events/${id}`, event, true);
  if (!firebaseRef || "error" in firebaseRef)
    return {
      error: {
        message: "Failed to update Event by id " + id,
        type: "firebase",
        e: null,
      },
    };

  // Setup Listener
  if (listener) eventListener(firebaseRef);

  return null;
};

export const UPDATE_EVENT_INFO = async (
  id: string,
  info: any
): Promise<null | ErrorInterface> => {
  // Update Event Info
  const updateResponse = await update(`events/${id}/eventData`, { info: info });
  if (updateResponse && "error" in updateResponse)
    return {
      error: {
        message: "Failed to update Event Info by id " + id,
        type: "firebase",
        e: null,
      },
    };

  return null;
};

export const REMOVE_EVENT = async (
  id: string
): Promise<null | ErrorInterface> => {
  // Remove Event
  const removeResponse = await remove(`events/${id}`);
  if (removeResponse && "error" in removeResponse)
    return {
      error: {
        message: "Failed to remove Event by id " + id,
        type: "firebase",
        e: null,
      },
    };

  return null;
};

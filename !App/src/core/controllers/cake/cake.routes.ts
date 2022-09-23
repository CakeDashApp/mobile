import { CakeInterface } from "./cake.interface";
import { get, remove, update } from "../../api/firebase";
import { cakeListener } from "./cake.listener";
import { ErrorInterface } from "../error/error.interface";

export const FETCH_CAKE = async (
  id: string,
  listener?: boolean
): Promise<CakeInterface | ErrorInterface> => {
  if (id === "")
    return {
      error: {
        message: "Failed to fetch Cake by id " + id,
        type: "firebase",
        e: null,
      },
    };

  // Get FirebaseObject
  const firebaseObject = await get(`cakes/${id}`, true);
  if (!firebaseObject || "error" in firebaseObject)
    return {
      error: {
        message: "Failed to fetch Cake by id " + id,
        type: "firebase",
        e: null,
      },
    };

  // Get Cake & Ref
  const ref = firebaseObject.ref;
  const cake = firebaseObject.responseData;
  if (!cake)
    return {
      error: {
        message: "Failed to fetch Cake by id " + id,
        type: "firebase",
        e: null,
      },
    };

  // Setup Listener
  if (listener) cakeListener(ref);

  return cake;
};

export const UPDATE_CAKE = async (
  id: string,
  cake: CakeInterface,
  listener?: boolean
): Promise<null | ErrorInterface> => {
  // Update Cake
  const firebaseRef = await update(`cakes/${id}`, cake, true);
  if (!firebaseRef || "error" in firebaseRef)
    return {
      error: {
        message: "Failed to update Cake by id " + id,
        type: "firebase",
        e: null,
      },
    };

  // Setup Listener
  if (listener) cakeListener(firebaseRef);

  return null;
};

export const UPDATE_CAKE_IS_VISIBLE = async (
  id: string,
  isVisible: boolean
): Promise<null | ErrorInterface> => {
  // Update Cake
  const updateResponse = await update(`cakes/${id}`, { isVisible: isVisible });
  if (updateResponse !== null && "error" in updateResponse)
    return {
      error: {
        message: "Failed to update Cake isVisible by id " + id,
        type: "firebase",
        e: null,
      },
    };

  return null;
};

export const REMOVE_CAKE = async (
  id: string
): Promise<null | ErrorInterface> => {
  // Remove Cake
  const removeResponse = await remove(`cakes/${id}`);
  if (removeResponse && "error" in removeResponse)
    return {
      error: {
        message: "Failed to remove Cake by id " + id,
        type: "firebase",
        e: null,
      },
    };

  return null;
};

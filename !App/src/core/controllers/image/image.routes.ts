import { get, remove, update } from "../../api/firebase";
import { ImageInterface } from "./image.interface";
import { ErrorInterface } from "../error/error.interface";

export const FETCH_IMAGE = async (
  id: string
): Promise<ImageInterface | ErrorInterface> => {
  if (id === "")
    return {
      error: {
        message: "Failed to fetch Image by id " + id,
        type: "firebase",
        e: null,
      },
    };

  // Get Image
  const image = await get(`images/${id}`);
  if (!image)
    return {
      error: {
        message: "Failed to fetch Image by id " + id,
        type: "firebase",
        e: null,
      },
    };

  return image;
};

export const UPDATE_IMAGE = async (
  id: string,
  image: ImageInterface
): Promise<null | ErrorInterface> => {
  // Update Image
  const updateResponse = await update(`images/${id}`, image);
  if (updateResponse && "error" in updateResponse)
    return {
      error: {
        message: "Failed to update Image by id " + id,
        type: "firebase",
        e: null,
      },
    };

  return null;
};

export const REMOVE_IMAGE = async (
  id: string
): Promise<null | ErrorInterface> => {
  // Remove Image
  const removeResponse = await remove(`images/${id}`);
  if (removeResponse && "error" in removeResponse)
    return {
      error: {
        message: "Failed to remove Image by id " + id,
        type: "firebase",
        e: null,
      },
    };

  return null;
};

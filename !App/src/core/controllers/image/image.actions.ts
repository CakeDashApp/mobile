import {
  ImageInterface,
  NoImageInterface,
  SourceInterface,
} from "./image.interface";
import { FETCH_IMAGE, REMOVE_IMAGE, UPDATE_IMAGE } from "./image.routes";
import { generateId } from "../../helper/general/id.helper";
import { sendCoreLog } from "../../helper/general/logger.helper";
import { generateLightColor } from "../../helper/general/color.helper";
import { ErrorInterface } from "../error/error.interface";
import { IMAGES } from "./image.controller";

//======================================================================================================================
// Create Image
//======================================================================================================================

export const createImage = async (
  imageData: SourceInterface | NoImageInterface,
  id?: string
): Promise<ImageInterface | ErrorInterface> => {
  sendCoreLog("Create Image");

  // Image Id
  const imageId = id || generateId();

  // Create Image
  const image: ImageInterface = {
    id: imageId,
    imageData: imageData,
  };

  // Update Image
  const updateImageResponse = await UPDATE_IMAGE(imageId, image);
  if (updateImageResponse !== null && "error" in updateImageResponse)
    return updateImageResponse;

  // Core
  IMAGES.collect(image, "default");

  sendCoreLog("End Create Image");
  return image;
};

//======================================================================================================================
// Set Image Data
//======================================================================================================================

export const setImageData = async (
  id: string,
  imageData: NoImageInterface | SourceInterface
): Promise<ImageInterface | ErrorInterface> => {
  sendCoreLog("Set Image Data " + id, imageData);

  // Image
  const image: ImageInterface = {
    id: id,
    imageData: imageData,
  };

  // Update Image
  const updateImageResponse = await UPDATE_IMAGE(id, image);
  if (updateImageResponse !== null && "error" in updateImageResponse)
    return updateImageResponse;

  // Core
  IMAGES.collect(image, "default");

  sendCoreLog("End Set Image Data " + id);
  return image;
};

//======================================================================================================================
// Fetch Image
//======================================================================================================================

export const fetchImage = async (
  id: string
): Promise<ImageInterface | ErrorInterface> => {
  sendCoreLog("Fetch Image " + id);

  const image = IMAGES.getItemById(id);
  if (image && image.exists) return image.copy();

  // Fetch Image
  const firebaseImage = await FETCH_IMAGE(id);
  if ("error" in firebaseImage) return firebaseImage;

  // Check if Image Object is complete
  if (!firebaseImage.imageData)
    return {
      error: {
        message: "Failed to fetch Image!",
        type: "firebase",
        e: null,
      },
    };

  IMAGES.collect(firebaseImage);

  return firebaseImage;
};

//======================================================================================================================
// Remove Image
//======================================================================================================================

export const removeImage = async (
  id: string
): Promise<ErrorInterface | null> => {
  sendCoreLog("Remove Image " + id);

  // Remove Image
  const removeImageResponse = await REMOVE_IMAGE(id);
  if (removeImageResponse !== null && "error" in removeImageResponse)
    return removeImageResponse;

  // Core
  IMAGES.remove(id).everywhere();

  sendCoreLog("End Remove Image " + id);
  return null;
};

//======================================================================================================================
// Generate Image
//======================================================================================================================

export const generateImage = (
  imageType: "user" | "cake" | "users",
  id?: string
): ImageInterface => {
  // Image Id
  const imageId = id || generateId();

  return {
    id: imageId,
    imageData: {
      icon: imageType,
      color: generateLightColor(),
    },
  };
};

import ImagePicker from "react-native-image-crop-picker";
// @ts-ignore
import RNFetchBlob from "react-native-fetch-blob";
import core from "../../../../src/core";
import strings from "./strings";
import * as alerts from "./alerts";
import { ErrorInterface } from "../../../../src/core/controllers/error/error.interface";
import { ImageInterface } from "../../../../src/core/controllers/image/image.interface";

// Image Size
export const imageSize = 500;

//======================================================================================================================
// Get Image
//======================================================================================================================

export const getImage = async (
  useCamera: boolean,
  circleOverlay?: boolean
): Promise<ImageInterface | ErrorInterface> => {
  // Error
  let error: ErrorInterface | null = null;

  const fileReader = RNFetchBlob.fs;

  // Image
  let image: ImageInterface = {
    id: core.helper.id.generateId(),
    imageData: {
      source: {
        uri: "",
      },
    },
  };
  let pickedImage = null;

  try {
    if (!useCamera) {
      //Set image Settings
      pickedImage = await ImagePicker.openPicker({
        width: imageSize,
        height: imageSize,
        cropping: true,
        cropperCircleOverlay: circleOverlay,
        mediaType: "photo",
      });
    } else {
      pickedImage = await ImagePicker.openCamera({
        width: imageSize,
        height: imageSize,
        cropperCircleOverlay: circleOverlay,
        cropping: true,
        mediaType: "photo",
      });
    }
  } catch (e) {
    console.log(e);
    error = {
      error: {
        type: !useCamera ? "library" : "camera",
        message: e.message,
        e: e,
      },
    };
  }

  if (!error) {
    if (pickedImage && "path" in pickedImage) {
      // Get Image Path
      const imagePath = pickedImage.path;

      //Get file as base64
      const file = await fileReader.readFile(imagePath, "base64");
      if ("source" in image?.imageData)
        image.imageData.source = { uri: "data:image/jpeg;base64," + file };
    } else {
      error = {
        error: {
          type: "other",
          message: strings().defaultErrorTitle,
          e: null,
        },
      };
    }
  }

  return error || image;
};

//======================================================================================================================
// Handle Errors
//======================================================================================================================

export const handleError = (error: ErrorInterface) => {
  //User cancelled Image selection or Camera
  if (error.error.message.indexOf("cancelled") !== -1) return;

  if (
    error.error.type === "camera" &&
    error.error.message.indexOf("permission missing") !== -1
  ) {
    // Alert
    alerts.deniedCameraPermissionAlert();
  } else if (
    error.error.type === "library" &&
    error.error.message.indexOf("permission missing") !== -1
  ) {
    // Alert
    alerts.deniedLibraryPermissionAlert();
  } else {
    // Alert
    alerts.generalErrorAlert(error.error.message);
  }
};

//======================================================================================================================
// Get Select Method
//======================================================================================================================

export const getSelectImageMethod = async (): Promise<boolean | null> => {
  return await alerts.selectImageSelectWayAlert();
};

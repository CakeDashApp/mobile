import { Alert } from "react-native";
import strings from "./strings";

//======================================================================================================================
// Denied Camera Permission Alert
//======================================================================================================================

export const deniedCameraPermissionAlert = async (): Promise<"OK"> => {
  const AsyncAlert = async () =>
    new Promise((resolve) => {
      Alert.alert(strings().deniedCameraPermissionErrorTitle, "", [
        {
          text: "Ok",
          onPress: () => {
            resolve("OK");
          },
        },
      ]);
    });

  // @ts-ignore
  return await AsyncAlert();
};

//======================================================================================================================
// Denied Library Permission Alert
//======================================================================================================================

export const deniedLibraryPermissionAlert = async (): Promise<"OK"> => {
  const AsyncAlert = async () =>
    new Promise((resolve) => {
      Alert.alert(
        strings().deniedLibraryPermissionErrorTitle,
        strings().deniedLibraryPermissionErrorMessage,
        [
          {
            text: "Ok",
            onPress: () => {
              resolve("OK");
            },
          },
        ]
      );
    });

  // @ts-ignore
  return await AsyncAlert();
};

//======================================================================================================================
// General Error Alert
//======================================================================================================================

export const generalErrorAlert = async (
  errorMessage: string
): Promise<"OK"> => {
  const AsyncAlert = async () =>
    new Promise((resolve) => {
      Alert.alert(strings().defaultErrorTitle, errorMessage, [
        {
          text: "Ok",
          onPress: () => {
            resolve("OK");
          },
        },
      ]);
    });

  // @ts-ignore
  return await AsyncAlert();
};

//======================================================================================================================
// Select Image Select Way Alert
//======================================================================================================================

export const selectImageSelectWayAlert = async (): Promise<boolean | null> => {
  const AsyncAlert = async () =>
    new Promise((resolve) => {
      Alert.alert(strings().selectImageTitle, strings().selectImageMessage, [
        {
          text: strings().newButton,
          style: "default",
          onPress: () => {
            //Open Image Picker with Camera
            resolve(true);
          },
        },
        {
          text: strings().selectButton,
          style: "default",
          onPress: () => {
            //Open Image Picker with Library
            resolve(false);
          },
        },
        {
          text: strings().cancelButton,
          style: "cancel",
          onPress: () => {
            resolve(null);
          },
        },
      ]);
    });

  // @ts-ignore
  return await AsyncAlert();
};

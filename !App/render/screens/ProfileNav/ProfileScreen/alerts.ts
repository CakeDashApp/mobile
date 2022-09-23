import { Alert } from "react-native";
import strings from "./strings";

//======================================================================================================================
// Logout Alert
//======================================================================================================================

export const logoutAlert = async (): Promise<"YES" | "NO"> => {
  const AsyncAlert = async () =>
    new Promise((resolve) => {
      Alert.alert(
        strings().logoutAlertTitle,
        strings().logoutAlertText,
        [
          {
            text: strings().noButtonText,
            onPress: () => {
              resolve("NO");
            },
          },
          {
            text: strings().yesButtonText,
            onPress: () => {
              resolve("YES");
            },
          },
        ],
        { cancelable: false }
      );
    });

  // @ts-ignore
  return await AsyncAlert();
};

//======================================================================================================================
// Delete Account Alert
//======================================================================================================================

export const deleteAccountAlert = async (): Promise<"YES" | "NO"> => {
  const AsyncAlert = async () =>
    new Promise((resolve) => {
      Alert.alert(
        strings().deleteAccountAlertTitle,
        strings().deleteAccountAlertText,
        [
          {
            text: strings().noButtonText,
            onPress: () => {
              resolve("NO");
            },
          },
          {
            text: strings().yesButtonText,
            onPress: () => {
              resolve("YES");
            },
          },
        ],
        { cancelable: false }
      );
    });

  // @ts-ignore
  return await AsyncAlert();
};

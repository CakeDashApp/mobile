import { Alert } from "react-native";
import strings from "./strings";

//======================================================================================================================
// Reset Password Alert
//======================================================================================================================

export const resetPasswordAlert = async (): Promise<"YES" | "NO"> => {
  const AsyncAlert = async () =>
    new Promise((resolve) => {
      Alert.alert(
        strings().resetPasswordAlertTitle,
        strings().resetPasswordAlertText,
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

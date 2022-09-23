import { Alert } from "react-native";
import strings from "./strings";

//======================================================================================================================
// Add Dash Alert
//======================================================================================================================

export const addDashAlert = async (
  memberName: string
): Promise<"YES" | "NO"> => {
  const AsyncAlert = async () =>
    new Promise((resolve) => {
      Alert.alert(
        strings().addDashAlertTitle,
        strings().addDashAlertText.replace("${name}", memberName),
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

import { Alert } from "react-native";
import core from "../../../../src/core";
import strings from "./strings";

//======================================================================================================================
// Remove Team Alert
//======================================================================================================================

export const removeTeamAlert = async (): Promise<"YES" | "NO"> => {
  // Have to sleep because modal close Alert -> wait until modal has been hidden
  await core.helper.date.sleep(1000);
  const AsyncAlert = async () =>
    new Promise((resolve) => {
      Alert.alert(
        strings().removeTeamAlertTitle,
        strings().removeTeamAlertText,
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
// Leave Team Alert
//======================================================================================================================

export const leaveTeamAlert = async (): Promise<"YES" | "NO"> => {
  // Have to sleep because modal close Alert -> wait until modal has been hidden
  await core.helper.date.sleep(1000);
  const AsyncAlert = async () =>
    new Promise((resolve) => {
      Alert.alert(
        strings().leaveTeamAlertTitle,
        strings().leaveTeamAlertText,
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

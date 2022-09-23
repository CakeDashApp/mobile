import { Alert } from "react-native";
import core from "../../../../src/core";
import strings from "./strings";

//======================================================================================================================
// Kick Member Alert
//======================================================================================================================

export const kickMemberAlert = async (
  memberName: string
): Promise<"YES" | "NO"> => {
  // Have to sleep because modal close Alert -> wait until modal has been hidden
  await core.helper.date.sleep(1000);
  const AsyncAlert = async () =>
    new Promise((resolve) => {
      Alert.alert(
        strings().kickMemberAlertTitle,
        strings().kickMemberAlertText.replace("${name}", memberName),
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
// Update Admin Alert
//======================================================================================================================

export const updateAdminAlert = async (
  memberName: string,
  admin: boolean
): Promise<"YES" | "NO"> => {
  // Have to sleep because modal close Alert -> wait until modal has been hidden
  await core.helper.date.sleep(1000);
  const AsyncAlert = async () =>
    new Promise((resolve) => {
      Alert.alert(
        admin
          ? strings().addAdminToMemberAlertTitle
          : strings().removeAdminFromMemberAlertTitle,
        admin
          ? strings().addAdminToMemberAlertText.replace("${name}", memberName)
          : strings().removeAdminFromMemberAlertText.replace(
              "${name}",
              memberName
            ),
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
// Make Member to Creator Alert
//======================================================================================================================

export const makeMemberToCreatorAlert = async (
  memberName: string
): Promise<"YES" | "NO"> => {
  // Have to sleep because modal close Alert -> wait until modal has been hidden
  await core.helper.date.sleep(1000);
  const AsyncAlert = async () =>
    new Promise((resolve) => {
      Alert.alert(
        strings().makeMemberToCreatorAlertTitle,
        strings().makeMemberToCreatorAlertText.replace("${name}", memberName),
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

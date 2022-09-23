import React, { useContext, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import core from "../../../../src/core";
import { useNavigation } from "@react-navigation/native";
import Headerbar from "../../../../navigation/components/Headerbar";
import CIcon from "../../../../assets/icons/cIcon";
import HeaderView from "./components/HeaderView";
import BottomView from "./components/BottomView";
import * as controller from "./controller";
import SaveButton from "./components/SaveButton";
import strings from "./strings";
import CFullScreenInfo from "../../../components/project/cFullScreenInfo";
import { DropDownHolder } from "../../../components/project/DropDownHolder";
import resetNavigator from "../../../../navigation/helper/ResetNavigator";
import { useAgile } from "@agile-ts/react";
import { ImageInterface } from "../../../../src/core/controllers/image/image.interface";
import ThemeContext from "../../../../context/ThemeContext";
import { ProfileEditor } from "./controller";

interface Props {}

const ProfileScreen: React.FC<Props> = (props) => {
  const navigation = useNavigation();
  let goToAuth = () => navigation.navigate("Auth", { screen: "Start" });
  const goToEditProfileModal = () => navigation.navigate("EditProfileModal");
  const goToChangePasswordModal = () =>
    navigation.navigate("ChangePasswordModal");
  const goToFullDescriptionModal = (description: string) =>
    navigation.navigate("FullDescriptionModal", { description: description });
  const goToSettings = () => navigation.navigate("Settings");

  const theme = useContext(ThemeContext);
  useAgile(core.other.LANGUAGE);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const user = useAgile(core.user.CURRENT_USER);
  const userImage = useAgile(
    core.image.IMAGES.getItemById((user && user.userData.imageId) || "unknown")
  );

  useAgile(controller.ProfileEditor.deps);

  const formIsModified = controller.ProfileEditor.areModified(["image"]);

  useEffect(() => {
    ProfileEditor.updateInitialValue("id", user?.id);
    ProfileEditor.updateInitialValue("image", userImage);
  }, [user?.id]);

  const onDeleteAccount = async () => {
    // Delete Account
    const deleteAccountResponse = await controller.deleteAccountAction();

    // Go To Auth
    if (deleteAccountResponse !== null && "success" in deleteAccountResponse) {
      DropDownHolder.dropDown?.alertWithType(
        "success",
        deleteAccountResponse.success.title || "Success",
        deleteAccountResponse.success.message
      );
      goToAuth();
    }

    // Error Drop Down
    if (deleteAccountResponse !== null && "error" in deleteAccountResponse)
      DropDownHolder.dropDown?.alertWithType(
        "error",
        "Error",
        deleteAccountResponse.error.message
      );
  };

  const onLogout = async () => {
    // Logout
    const logoutResponse = await controller.logoutAction();

    // Go To Auth
    if (logoutResponse !== null && "success" in logoutResponse) {
      DropDownHolder.dropDown?.alertWithType(
        "success",
        logoutResponse.success.title || "Success",
        logoutResponse.success.message
      );
      goToAuth();
      resetNavigator(navigation);
    }

    // Error Drop Down
    if (logoutResponse !== null && "error" in logoutResponse)
      DropDownHolder.dropDown?.alertWithType(
        "error",
        "Error",
        logoutResponse.error.message
      );
  };

  const onSubmit = async () => {
    setIsLoading(true);

    // Submit
    const submitResponse = await controller.ProfileEditor.submit();

    // Drop Down Error
    if (submitResponse && "error" in submitResponse)
      DropDownHolder.dropDown?.alertWithType(
        "error",
        "Error",
        submitResponse.error.message
      );

    // Drop Down Success
    if (submitResponse && "success" in submitResponse)
      DropDownHolder.dropDown?.alertWithType(
        "success",
        submitResponse.success.title || "Success",
        submitResponse.success.message
      );

    setIsLoading(false);
  };

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return user ? (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView style={{ flex: 1 }} bounces={false}>
        <Headerbar
          title={strings().headerText}
          color={theme.colors.on_primary}
          backgroundColor={theme.colors.primary}
          rightElement={
            <TouchableOpacity onPress={goToSettings}>
              <CIcon
                type={"settings"}
                color={theme.colors.on_primary}
                strokeWidth={2}
                size={35}
              />
            </TouchableOpacity>
          }
          descriptors={null}
          navigation={null}
          state={null}
        />
        <HeaderView
          onImageChange={(image: ImageInterface) =>
            controller.ProfileEditor.setValue("image", image, {
              background: false,
            })
          }
          onChangePassword={goToChangePasswordModal}
          onEditProfile={() => goToEditProfileModal()}
          onResetImage={() =>
            controller.ProfileEditor.setValue(
              "image",
              core.image.generateImage("user"),
              { background: false }
            )
          }
          onShowFullDescription={() =>
            goToFullDescriptionModal(user.userData.description)
          }
        />
        <BottomView onDeleteAccount={onDeleteAccount} onLogout={onLogout} />
      </ScrollView>
      <SaveButton
        onPress={onSubmit}
        isLoading={isLoading}
        show={formIsModified}
      />
    </View>
  ) : (
    <CFullScreenInfo error />
  );
};

export default ProfileScreen;

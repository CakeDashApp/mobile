import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import NameInput from "./components/NameInput";
import DescriptionInput from "./components/DescriptionInput";
import { DropDownHolder } from "../../../../../components/project/DropDownHolder";
import * as controller from "./controller";
import CSectionModal from "../../../../../components/project/cSectionModal";
import CDismissKeyboard from "../../../../../components/default/cDismissKeyboard";
import strings from "./strings";
import { useAgile } from "@agile-ts/react";
import core from "../../../../../../src/core";

interface Props {}

const EditProfileModal: React.FC<Props> = (props) => {
  // Navigation
  const navigation = useNavigation();
  const goToProfile = () => navigation.navigate("Profile");

  // Default
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Show Submit Button
  const showSubmitButton = controller.ExtraProfileEditor.areModified([
    "name",
    "description",
  ]);

  const user = useAgile(core.user.CURRENT_USER);

  useEffect(() => {
    controller.ExtraProfileEditor.updateInitialValue("id", user?.id);
    controller.ExtraProfileEditor.updateInitialValue(
      "name",
      user?.userData.name
    );
    controller.ExtraProfileEditor.updateInitialValue(
      "description",
      user?.userData.description
    );
  }, [user?.id]);

  // Make Form reactive
  useAgile(controller.ExtraProfileEditor.deps);

  // Reset EditProfile Items if go Back
  navigation.addListener("blur", () => {
    controller.ExtraProfileEditor.getItemById("name")?.reset();
    controller.ExtraProfileEditor.getItemById("description")?.reset();
    controller.ExtraProfileEditor.submitted = false;
  });

  const onSubmit = async () => {
    setIsLoading(true);

    // Submit
    const submitResponse = await controller.ExtraProfileEditor.submit();

    // Drop Down Error
    if (submitResponse && "error" in submitResponse) {
      DropDownHolder.dropDown?.alertWithType(
        "error",
        "Error",
        submitResponse.error.message
      );
    }

    // Drop Down Success
    if (submitResponse && "success" in submitResponse)
      DropDownHolder.dropDown?.alertWithType(
        "success",
        submitResponse.success.title || "Success",
        submitResponse.success.message
      );

    // Go Back
    if (submitResponse && !("error" in submitResponse)) goToProfile();

    setIsLoading(false);
  };

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <CSectionModal
      sections={[
        {
          key: 1,
          content: (
            <CDismissKeyboard>
              <NameInput />
              <DescriptionInput />
            </CDismissKeyboard>
          ),
          name: strings().editProfileTitle,
          icon: { type: "user", iconStroke: 2 },
        },
      ]}
      onGoBack={goToProfile}
      onSubmit={onSubmit}
      submitButton={showSubmitButton}
      backButton
      isLoading={isLoading}
    />
  );
};

export default EditProfileModal;

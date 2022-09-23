import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import CSectionModal from "../../../../../components/project/cSectionModal";
import strings from "./strings";
import TitleInput from "./components/TitleInput";
import DescriptionInput from "./components/DescriptionInput";
import * as controller from "./controller";
import { DropDownHolder } from "../../../../../components/project/DropDownHolder";

interface Props {}

const AddDashModal: React.FC<Props> = (props) => {
  // Navigation
  const navigation = useNavigation();
  const route = useRoute();
  const goToMember = (memberId: string, teamId: string) =>
    navigation.navigate("Member", {
      memberId: memberId,
      teamId: teamId,
    });

  // Default
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Error
  const [showInputError, setShowInputError] = useState<boolean>(false);

  // Member
  const memberId: string | null = route.params?.memberId || null;

  // Team
  const teamId: string | null = route.params?.teamId || null;

  //======================================================================================================================
  // Set Values of Editor
  // Why replacing the original values?
  // Because I can't load the user in the controller.. because the controller get loaded at the start of the !App and there the use doesn't exist yet -> error
  //======================================================================================================================

  useEffect(() => {
    if (memberId && teamId) controller.setAddDashEditorValues(memberId, teamId);
  }, [memberId, teamId]);

  //======================================================================================================================
  // On Submit
  //======================================================================================================================

  const onSubmit = useCallback(async () => {
    setIsLoading(true);
    setShowInputError(false);

    // Submit
    const submitResponse = await controller.AddDashEditor.submit();

    // Drop Down Error
    if (submitResponse !== null && "error" in submitResponse) {
      DropDownHolder.dropDown?.alertWithType(
        "error",
        "Error",
        submitResponse.error.message
      );
      setShowInputError(submitResponse.error.type === "input");
    }

    // Drop Down Success
    if (submitResponse !== null && "success" in submitResponse)
      DropDownHolder.dropDown?.alertWithType(
        "success",
        submitResponse.success.title || "Success",
        submitResponse.success.message
      );

    // Got To Member
    if (submitResponse !== null && "success" in submitResponse)
      goToMember(memberId || "", teamId || "");

    setIsLoading(false);
  }, [memberId, teamId]);

  //======================================================================================================================
  // On Go Back
  //======================================================================================================================

  const onGoBack = useCallback(() => {
    // Reset Input Error
    setShowInputError(false);

    // Go Back
    goToMember(memberId || "", teamId || "");
  }, [memberId, teamId]);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <CSectionModal
      sections={[
        {
          key: 1,
          content: (
            <View>
              <TitleInput showInputError={showInputError} />
              <DescriptionInput showInputError={showInputError} />
            </View>
          ),
          name: strings().addDashModalTitle,
          icon: { type: "zap", iconStroke: 2 },
        },
      ]}
      onGoBack={onGoBack}
      backButton
      isLoading={isLoading}
      onSubmit={onSubmit}
      submitButton={true}
    />
  );
};

export default AddDashModal;

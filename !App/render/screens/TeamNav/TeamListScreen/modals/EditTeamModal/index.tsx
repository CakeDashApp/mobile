import React, { useCallback, useEffect, useState } from "react";
import CSectionModal from "../../../../../components/project/cSectionModal";
import core from "../../../../../../src/core";
import * as controller from "./controller";
import GeneralView from "./components/GeneralView";
import DashesView from "./components/DashesView";
import StatusView from "./components/StatusView";
import DefinedCakesView from "./components/DefinedCakesView";
import OtherView from "./components/OtherView";
import { DropDownHolder } from "../../../../../components/project/DropDownHolder";
import { useNavigation, useRoute } from "@react-navigation/native";
import strings from "./strings";
import { useAgile } from "@agile-ts/react";

interface Props {}

const EditTeamModal: React.FC<Props> = (props) => {
  // Navigation
  const navigation = useNavigation();
  const route = useRoute();
  const goBack = () => navigation.goBack();
  const goToDefinedCakesModal = () => navigation.navigate("DefinedCakesModal");

  // Default
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Error
  const [showInputError, setShowInputError] = useState<boolean>(false);

  // Team
  const teamId: string | null = route.params?.teamId || null;
  const team = useAgile(core.team.TEAMS.getItemById(teamId || "unknown"));
  const teamImage = useAgile(
    core.image.IMAGES.getItemById(team?.teamData?.imageId || "unknown")
  );

  // Show Submit Button
  const showSubmitButton = controller.TeamEditor.status.isModified || !teamId;

  // Focused
  const [generalViewIsFocused, setGeneralViewIsFocused] = useState<boolean>(
    false
  );

  // Make Form reactive
  useAgile(controller.TeamEditor.dependencies);

  //======================================================================================================================
  // Set Default Values of Editor
  //======================================================================================================================

  useEffect(() => {
    const setEditor = async () => {
      setIsLoading(true);
      await controller.setTeamEditorValues(teamId, team, teamImage);
      setIsLoading(false);
    };

    setEditor();
  }, [teamId]);

  //======================================================================================================================
  // On Submit
  //======================================================================================================================

  const onSubmit = useCallback(async () => {
    setIsLoading(true);
    setShowInputError(false);

    // Submit
    const submitResponse = await controller.TeamEditor.submit();

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

    // Go Back
    if (submitResponse === null || !("error" in submitResponse)) goBack();

    setIsLoading(false);
  }, [controller.TeamEditor]);

  //======================================================================================================================
  // On Go Back
  //======================================================================================================================

  const onGoBack = useCallback(() => {
    // Reset Input Error
    setShowInputError(false);

    // Go Back
    goBack();
  }, []);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <CSectionModal
      sections={[
        {
          key: 1,
          content: (
            <GeneralView
              showInputError={showInputError}
              onFocus={() => setGeneralViewIsFocused(true)}
              onBlur={() => setGeneralViewIsFocused(false)}
            />
          ),
          name: strings().generalTitle,
          icon: { type: "book", iconStroke: 2 },
        },
        {
          key: 2,
          content: <DashesView />,
          name: strings().dashesTitle,
          icon: { type: "xSquare", iconStroke: 2 },
        },
        {
          key: 3,
          content: <StatusView />,
          name: strings().statusTitle,
          icon: { type: "copy", iconStroke: 2 },
        },
        {
          key: 4,
          content: (
            <DefinedCakesView
              showInputError={showInputError}
              onFocus={goToDefinedCakesModal}
            />
          ),
          name: strings().definedCakesTitle,
          icon: { type: "cake", iconStroke: 2 },
        },
        {
          key: 5,
          content: <OtherView />,
          name: strings().otherTitle,
          icon: { type: "sliders", iconStroke: 2 },
        },
      ]}
      onGoBack={onGoBack}
      backButton
      onSubmit={onSubmit}
      submitButton={showSubmitButton}
      isLoading={isLoading}
      showChevrons={!generalViewIsFocused}
      showSections={(generalViewIsFocused && [1]) || undefined}
    />
  );
};

export default EditTeamModal;

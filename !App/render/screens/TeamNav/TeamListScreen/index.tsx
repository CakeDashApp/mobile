import React, { useCallback, useContext, useEffect } from "react";
import { SafeAreaView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import Headerbar from "../../../../navigation/components/Headerbar";
import CIcon from "../../../../assets/icons/cIcon";
import core from "../../../../src/core";
import TeamListView from "./components/TeamListView";
import NoTeamsView from "./components/NoTeamsView";
import AddButton from "./components/AddButton";
import FindTeamModal from "./modals/FindTeamModal";
import EditTeamModal from "./modals/EditTeamModal";
import { DropDownHolder } from "../../../components/project/DropDownHolder";
import * as controller from "./controller";
import strings from "./strings";
import { useAgile } from "@agile-ts/react";
import ThemeContext from "../../../../context/ThemeContext";

interface Props {}

const TeamListScreen: React.FC<Props> = (props) => {
  // Navigation
  const navigation = useNavigation();
  const goToTeam = (id: string) => navigation.navigate("Team", { teamId: id });
  const goToEditTeamModal = (id: string | null) =>
    navigation.navigate("EditTeamModal", { teamId: id });
  const goToFindTeamModal = () => navigation.navigate("FindTeamModal");

  // Theme
  const theme = useContext(ThemeContext);

  // Teams
  const userTeams = useAgile(core.team.USER_TEAMS);

  // Language
  useAgile(core.other.LANGUAGE);

  //======================================================================================================================
  // Header
  //======================================================================================================================

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: (props: any) => {
        return (
          <Headerbar
            {...props}
            title={strings().headerTitle}
            color={theme.colors.on_background}
            backgroundColor={theme.colors.background}
            rightElement={
              <TouchableOpacity onPress={goToFindTeamModal}>
                <CIcon
                  type={"search"}
                  color={theme.colors.on_background}
                  strokeWidth={2}
                  size={35}
                />
              </TouchableOpacity>
            }
          />
        );
      },
    });
  }, []);

  //======================================================================================================================
  // On Remove Team
  //======================================================================================================================

  const onRemoveTeam = useCallback(
    async (id: string) => {
      // Remove Team
      const removeTeamResponse = await controller.removeTeam(id);

      // Success Drop Down
      if (removeTeamResponse !== null && "success" in removeTeamResponse)
        DropDownHolder.dropDown?.alertWithType(
          "success",
          removeTeamResponse.success.title || "Success",
          removeTeamResponse.success.message
        );

      // Error Drop Down
      if (removeTeamResponse !== null && "error" in removeTeamResponse)
        DropDownHolder.dropDown?.alertWithType(
          "error",
          "Error",
          removeTeamResponse.error.message
        );
    },
    [controller.removeTeam]
  );

  //======================================================================================================================
  // On Leave Team
  //======================================================================================================================

  const onLeaveTeam = useCallback(
    async (id: string, memberId: string) => {
      // Remove Team
      const leaveTeamResponse = await controller.leaveTeam(id, memberId);

      // Success Drop Down
      if (leaveTeamResponse !== null && "success" in leaveTeamResponse)
        DropDownHolder.dropDown?.alertWithType(
          "success",
          leaveTeamResponse.success.message || "Success",
          leaveTeamResponse.success.message
        );

      // Error Drop Down
      if (leaveTeamResponse !== null && "error" in leaveTeamResponse)
        DropDownHolder.dropDown?.alertWithType(
          "error",
          "Error",
          leaveTeamResponse.error.message
        );
    },
    [controller.leaveTeam]
  );

  //======================================================================================================================
  // Header
  //======================================================================================================================

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {userTeams.length > 0 ? (
        <TeamListView
          teams={userTeams}
          onEditTeam={(id: string) => goToEditTeamModal(id)}
          onLeaveTeam={onLeaveTeam}
          onRemoveTeam={onRemoveTeam}
          onTeamPressed={(id: string) => goToTeam(id)}
        />
      ) : (
        <NoTeamsView onJoinTeam={goToFindTeamModal} />
      )}
      <AddButton onPress={() => goToEditTeamModal(null)} />
    </SafeAreaView>
  );
};

export default TeamListScreen;

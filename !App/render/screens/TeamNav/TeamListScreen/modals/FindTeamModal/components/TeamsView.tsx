import React, {useContext} from "react";
import { FlatList } from "react-native";
import TeamListItem from "../../../../../../components/items/TeamListItem";
import core from "../../../../../../../src/core";
import { useAgile } from "@agile-ts/react";
import { TeamInterface } from "../../../../../../../src/core/controllers/team/team.interface";
import ThemeContext from "../../../../../../../context/ThemeContext";

interface Props {
  teams: TeamInterface[];
  onJoinTeam: (teamId: string) => void;
  onPressTeam: (teamId: string) => void;
}

const TeamsView: React.FC<Props> = (props) => {
  // Props
  const { teams, onJoinTeam, onPressTeam } = props;

  // Theme
  const theme = useContext(ThemeContext);

  // User
  const user = useAgile(core.user.CURRENT_USER);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <FlatList
      data={teams}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => {
        // Show Join Button
        const showJoinButton =
          itemData.item.teamData.settings.status !== "closed" &&
          core.helper.array.findMatchingValues(
            itemData.item.teamData.members.memberIds,
            user?.memberIds
          ).length <= 0;

        // Render
        return (
          <TeamListItem
            team={itemData.item}
            backgroundColor={theme.colors.surface}
            joinButton={
              showJoinButton
                ? {
                    onJoin: onJoinTeam,
                  }
                : undefined
            }
            onPress={onPressTeam}
          />
        );
      }}
    />
  );
};

export default TeamsView;

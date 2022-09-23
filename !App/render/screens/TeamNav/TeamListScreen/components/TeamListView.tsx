import React, {useContext} from "react";
import core from "../../../../../src/core";
import styled from "styled-components/native";
import { FlatList } from "react-native";
import TeamListItem from "../../../../components/items/TeamListItem";
import { TeamInterface } from "../../../../../src/core/controllers/team/team.interface";
import { MemberInterface } from "../../../../../src/core/controllers/member/member.interface";
import { ThemeInterface } from "../../../../../src/core/controllers/ui/interfaces";
import ThemeContext from "../../../../../context/ThemeContext";

interface Props {
  onEditTeam: (id: string) => void;
  onRemoveTeam: (id: string) => void;
  onLeaveTeam: (id: string, memberId: string) => void;
  onTeamPressed: (id: string) => void;
  teams: TeamInterface[];
}

const TeamListView: React.FC<Props> = (props) => {
  // Props
  const { onEditTeam, onRemoveTeam, onTeamPressed, teams, onLeaveTeam } = props;

  // Theme
  const theme = useContext(ThemeContext);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <Container>
      <FlatList
        data={teams}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => {
          const userMember: MemberInterface | null = core.team.getUserMember(
            itemData.item.id || ""
          );
          return (
            <TeamListItem
              team={itemData.item}
              onPress={onTeamPressed}
              moreButton={{
                onEdit:
                  userMember?.memberData.role === "creator"
                    ? onEditTeam
                    : undefined,
                onRemove:
                  userMember?.memberData.role === "creator"
                    ? onRemoveTeam
                    : undefined,
                onLeave: (id: string) => onLeaveTeam(id, userMember?.id || ""),
              }}
              backgroundColor={theme.colors.background}
            />
          );
        }}
      />
    </Container>
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const Container = styled.View<{ theme: ThemeInterface }>`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
  padding: 10px;
`;

export default TeamListView;

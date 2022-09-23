import React, { useCallback, useEffect, useState } from "react";
import CSectionModal from "../../../../../components/project/cSectionModal";
import core from "../../../../../../src/core";
import styled from "styled-components/native";
import CTabRow, {
  TagInterface,
} from "../../../../../components/project/cTabRow";
import { useNavigation } from "@react-navigation/native";
import NoTeamsView from "./components/NoTeamsView";
import TeamsView from "./components/TeamsView";
import * as controller from "./controller";
import { DropDownHolder } from "../../../../../components/project/DropDownHolder";
import strings from "./strings";
import { TeamInterface } from "../../../../../../src/core/controllers/team/team.interface";

interface Props {}

const FindTeamModal: React.FC<Props> = (props) => {
  // Navigation
  const navigation = useNavigation();
  const goToTeamList = () => navigation.navigate("TeamList");
  const goToTeam = (id: string) => navigation.navigate("Team", { teamId: id });

  // Default
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Teams
  const [teams, setTeams] = useState<TeamInterface[]>([]);
  const [filteredTeams, setFilteredTeams] = useState<TeamInterface[]>([]);
  const showTeams = filteredTeams.length > 0 && !isLoading;

  // Tag
  const [currentTag, setCurrentTag] = useState<string | number>(
    controller.ALL_TAG
  );

  // Search
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");

  //======================================================================================================================
  // Fetch Start Teams
  //======================================================================================================================

  useEffect(() => {
    fetchTeams();
  }, []);

  //======================================================================================================================
  // Fetch Teams
  //======================================================================================================================

  const fetchTeams = useCallback(async () => {
    setIsLoading(true);

    // Fetch 10 Teams
    const tempTeams = await core.team.fetchRandomTeams(10);
    setTeams(tempTeams);
    setFilteredTeams(controller.filterTeams(currentTag, tempTeams));

    setIsLoading(false);
  }, [currentTag]);

  //======================================================================================================================
  // On Tag Changed
  //======================================================================================================================

  const onTagChanged = useCallback(
    (tag: TagInterface) => {
      setCurrentTag(tag.key);
      setFilteredTeams(controller.filterTeams(tag.key, teams));
    },
    [teams]
  );

  //======================================================================================================================
  // On Search Value Changed
  //======================================================================================================================

  const onSearchValueChanged = useCallback(
    async (value: string | null) => {
      setIsLoading(true);
      setSearchValue(value || "");

      if (value !== null) {
        const orderedTeams = await core.team.fetchRandomTeams(5, value);
        setTeams(orderedTeams);
        setFilteredTeams(controller.filterTeams(currentTag, orderedTeams));
      }

      setIsLoading(false);
    },
    [currentTag]
  );

  //======================================================================================================================
  // On Join
  //======================================================================================================================

  const onJoin = useCallback(async (teamId: string) => {
    // Join Team
    const joinTeamResponse = await controller.joinTeam(teamId);

    // Error Drop Down
    if (joinTeamResponse !== null && "error" in joinTeamResponse)
      DropDownHolder.dropDown?.alertWithType(
        "error",
        "Error",
        joinTeamResponse.error.message
      );
    else goToTeam(teamId);
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
            <Container>
              <CTabRow
                tags={[
                  { key: controller.ALL_TAG, label: strings().allTagText },
                  { key: controller.OPEN_TAG, label: strings().openTagText },
                  {
                    key: controller.CLOSED_TAG,
                    label: strings().closedTagText,
                  },
                ]}
                onTagChanged={onTagChanged}
                searchTag
                onSearch={(search) => setIsSearching(search)}
                onSearchValueChanged={onSearchValueChanged}
              />
              {showTeams ? (
                <TeamsView
                  teams={filteredTeams}
                  onJoinTeam={onJoin}
                  onPressTeam={() => {}}
                />
              ) : (
                <NoTeamsView
                  isLoading={isLoading}
                  isSearching={isSearching}
                  searchValue={searchValue}
                />
              )}
            </Container>
          ),
          name: strings().findTeamTitle,
          icon: { type: "search", iconStroke: 2 },
        },
      ]}
      onGoBack={goToTeamList}
      backButton
      scrollView={false}
    />
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const Container = styled.View`
  height: 100%;
`;

export default FindTeamModal;

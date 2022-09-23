import core from "../../../../../../src/core";
import { TeamInterface } from "../../../../../../src/core/controllers/team/team.interface";
import { ErrorInterface } from "../../../../../../src/core/controllers/error/error.interface";

// Tags
export const CLOSED_TAG = "closed";
export const ALL_TAG = "all";
export const OPEN_TAG = "open";

//======================================================================================================================
// Filter Teams
//======================================================================================================================

export const filterTeams = (
  tagKey: string | number,
  teams: TeamInterface[]
): TeamInterface[] => {
  let filteredTeams: TeamInterface[] = [];

  // Filter Teams
  switch (tagKey) {
    case ALL_TAG:
      filteredTeams = teams;
      break;

    case CLOSED_TAG:
      filteredTeams = teams.filter(
        (team) => team.teamData.settings.status === "closed"
      );
      break;

    case OPEN_TAG:
      filteredTeams = teams.filter(
        (team) => team.teamData.settings.status === "open"
      );
      break;
  }

  return filteredTeams;
};

//======================================================================================================================
// Join Team
//======================================================================================================================

export const joinTeam = async (id: string): Promise<ErrorInterface | null> => {
  return await core.team.joinTeam(id, core.auth.USER_ID.value);
};

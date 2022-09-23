import { removeTeamAlert } from "./alerts";
import core from "../../../../src/core";
import strings from "./strings";
import { leaveTeamAlert } from "../TeamScreen/alerts";

//======================================================================================================================
// Remove Team
//======================================================================================================================

export const removeTeam = async (id: string) => {
  // Alert
  const alertResponse: "YES" | "NO" = await removeTeamAlert();

  // Remove Team
  if (alertResponse === "YES") {
    const removeTeamResponse = await core.team.removeTeam(id);
    return (
      removeTeamResponse || {
        success: {
          title: strings().deletedTeamSuccessTitle,
          message: strings().deletedTeamSuccessText,
        },
      }
    );
  }

  return null;
};

//======================================================================================================================
// Leave Team
//======================================================================================================================

export const leaveTeam = async (id: string, memberId: string) => {
  // Alert
  const alertResponse: "YES" | "NO" = await leaveTeamAlert();

  // Leave Team
  if (alertResponse === "YES") {
    const leaveTeamResponse = await core.team.leaveTeam(memberId);
    return (
      leaveTeamResponse || {
        success: {
          title: strings().leftTeamSuccessTitle,
          message: strings().leftTeamSuccessText,
        },
      }
    );
  }

  return null;
};

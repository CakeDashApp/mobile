import core from "../../../../../../src/core";
import strings from "./strings";
import * as alerts from "./alerts";

//======================================================================================================================
// Set Add Dash Editor Values
//======================================================================================================================

export const setAddDashEditorValues = (memberId: string, teamId: string) => {
  AddDashEditor.updateOriginValue({
    id: memberId,
    teamId: teamId,
    name: "",
    description: "",
  });
};

//======================================================================================================================
// Add Dash Editor
//======================================================================================================================

export const AddDashEditor = new core.helper.editor.Editor({
  data: {
    id: "",
    teamId: "",
    title: "",
    description: "",
  },
  onSubmit: async (data: any) => {
    // Fetch Team
    const team = await core.team.fetchTeam(data.teamId);
    if ("error" in team) return team;

    // User Member
    const userMember = core.team.getUserMember(data.teamId);

    // Member
    const member = await core.member.fetchMember(data.id);
    if ("error" in member) return member;

    // Alert
    const alertResponse: "YES" | "NO" = await alerts.addDashAlert(
      member.memberData.name
    );

    if (alertResponse === "YES") {
      if (team.teamData.members.memberIds.length > 2) {
        // Create Vote Event
        const eventResponse = await core.event.VoteDashEvent(
          data.teamId,
          data.id,
          userMember?.id || "",
          data.title,
          data.description,
          Math.floor(team.teamData.members.memberIds.length / 2)
        );
        if ("error" in eventResponse) return eventResponse;
      } else {
        // Add Member Dash
        const addDashResponse = await core.member.addMemberDash(
          data.id,
          data.teamId
        );
        if ("error" in addDashResponse) return addDashResponse;
      }

      return {
        success: {
          title: strings().addDashSuccessTitle,
          message: strings().addDashSuccessText.replace(
            "${name}",
            member.memberData.name
          ),
        },
      };
    }

    return { reset: false, return: null };
  },
  fixedProperties: ["id", "teamId", "title", "description"],
  validateMethods: {
    title: async () => {
      const value: string = AddDashEditor.getValue("title");

      if (value.length < 2) {
        AddDashEditor.setStatus(
          "title",
          "error",
          strings().titleIsToShortError
        );
        return false;
      }

      AddDashEditor.resetStatus("title");
      return true;
    },
    description: async () => {
      const value: string = AddDashEditor.getValue("description");

      if (value.length < 4) {
        AddDashEditor.setStatus(
          "description",
          "error",
          strings().descriptionIsToShortError
        );
        return false;
      }

      AddDashEditor.resetStatus("description");
      return true;
    },
  },
  editableProperties: ["description", "title"],
});

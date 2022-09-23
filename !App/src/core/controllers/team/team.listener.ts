import { TEAMS } from "./team.controller";
import { TeamInterface } from "./team.interface";
import { sendListenerLog, sendTable } from "../../helper/general/logger.helper";
import { MEMBERS } from "../member/member.controller";
import { fetchMember } from "../member/member.actions";
import { fetchEvent } from "../event/event.actions";
import { fetchProduct } from "../product/product.actions";
import { fetchCake } from "../cake/cake.actions";

export const teamListener = (ref: any) => {
  ref.on("value", async (snapshot: any) => {
    // Team
    const team: TeamInterface = snapshot.val();
    const teamId = snapshot.key;

    sendListenerLog("Team Listener " + teamId);
    sendTable(team);

    // Check if Team Object is complete
    if (
      !team ||
      !team.teamData ||
      !team.teamData.members ||
      !team.teamData.settings
    ) {
      sendListenerLog("Remove Team " + teamId);
      TEAMS.remove(teamId).everywhere();
      if (MEMBERS.getGroup(teamId).exists) MEMBERS.getGroup(teamId).reset();
      return;
    }

    // Format Fetched Values
    team.eventIds = team.eventIds || [];
    team.teamData.imageId = team.teamData.imageId || null;
    team.cakeIds = team.cakeIds || [];
    team.teamData.members.memberIds = team.teamData.members.memberIds || [];
    team.teamData.members.adminIds = team.teamData.members.adminIds || [];
    team.productIds = team.productIds || [];

    // Update Members
    updateMembers(team);

    // Update Events
    updateEvents(team);

    // Update Cakes
    updateCakes(team);

    // Update Products
    updateProducts(team);

    // Core
    TEAMS.update(teamId, team);

    sendListenerLog("End Team Listener");
  });
};

const updateMembers = async (team: TeamInterface) => {
  // Get Old Team
  const oldTeam = TEAMS.getValueById(team.id);
  if (
    !oldTeam ||
    !oldTeam.teamData ||
    !oldTeam.teamData.members ||
    !oldTeam.teamData.settings
  )
    return;

  const oldMemberIds = [...oldTeam.teamData.members.memberIds];
  const memberIds = [...team.teamData.members.memberIds];

  // Check if memberIds got updated
  if (oldMemberIds !== memberIds) {
    // Check if Members have to be created
    for (let i = 0; i < memberIds.length; i++) {
      const memberId = memberIds[i];
      const isInOldMemberIds =
        oldMemberIds.findIndex((id) => id === memberId) !== -1;

      if (!isInOldMemberIds) {
        sendListenerLog("Add Member " + memberId);
        // Fetch Member
        await fetchMember(memberId);
      }
    }
  }
};

const updateEvents = async (team: TeamInterface) => {
  // Get Old Team
  const oldTeam = TEAMS.getValueById(team.id);
  if (
    !oldTeam ||
    !oldTeam.teamData ||
    !oldTeam.teamData.members ||
    !oldTeam.teamData.settings
  )
    return;

  const oldEventIds = [...oldTeam.eventIds];
  const eventIds = [...team.eventIds];

  // Check if eventIds got updated
  if (oldEventIds !== eventIds) {
    // Check if Events have to be created
    for (let i = 0; i < eventIds.length; i++) {
      const eventId = eventIds[i];
      const isInOldEventIds =
        oldEventIds.findIndex((id) => id === eventId) !== -1;

      if (!isInOldEventIds) {
        sendListenerLog("Add Event " + eventId);
        // Fetch Event
        await fetchEvent(eventId);
      }
    }
  }
};

const updateCakes = async (team: TeamInterface) => {
  // Get Old Team
  const oldTeam = TEAMS.getValueById(team.id);
  if (
    !oldTeam ||
    !oldTeam.teamData ||
    !oldTeam.teamData.members ||
    !oldTeam.teamData.settings
  )
    return;

  const oldCakeIds = [...oldTeam.cakeIds];
  const cakeIds = [...team.cakeIds];

  // Check if cakeIds got updated
  if (oldCakeIds !== cakeIds) {
    // Check if Cakes have to be created
    for (let i = 0; i < cakeIds.length; i++) {
      const cakeId = cakeIds[i];
      const isInOldCakeIds = oldCakeIds.findIndex((id) => id === cakeId) !== -1;

      if (!isInOldCakeIds) {
        sendListenerLog("Add Cake " + cakeId);
        // Fetch Cake
        await fetchCake(cakeId);
      }
    }
  }
};

const updateProducts = async (team: TeamInterface) => {
  // Get Old Team
  const oldTeam = TEAMS.getValueById(team.id);
  if (
    !oldTeam ||
    !oldTeam.teamData ||
    !oldTeam.teamData.members ||
    !oldTeam.teamData.settings
  )
    return;

  const oldProductIds = [...oldTeam.productIds];
  const productIds = [...team.productIds];

  // Check if productIds got updated
  if (oldProductIds !== productIds) {
    // Check if Products have to be created
    for (let i = 0; i < productIds.length; i++) {
      const productId = productIds[i];
      const isInOldProductIds =
        oldProductIds.findIndex((id) => id === productId) !== -1;

      if (!isInOldProductIds) {
        sendListenerLog("Add Product " + productId);
        // Fetch Product
        await fetchProduct(productId);
      }
    }
  }
};

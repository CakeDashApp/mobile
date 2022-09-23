import { get, remove, update } from "../../api/firebase";
import { TeamInterface, TeamMembersInterface } from "./team.interface";
import { teamListener } from "./team.listener";
import { ErrorInterface } from "../error/error.interface";

export const FETCH_TEAM = async (
  id: string,
  listener?: boolean
): Promise<TeamInterface | ErrorInterface> => {
  if (id === "")
    return {
      error: {
        message: "Failed to fetch Team by id " + id,
        type: "firebase",
        e: null,
      },
    };

  // Get FirebaseObject
  const firebaseObject = await get(`teams/${id}`, true);
  if (!firebaseObject || "error" in firebaseObject)
    return {
      error: {
        message: "Failed to fetch Team by id " + id,
        type: "firebase",
        e: null,
      },
    };

  // Get Team & Ref
  const ref = firebaseObject.ref;
  const team = firebaseObject.responseData;
  if (!team)
    return {
      error: {
        message: "Failed to fetch Team by id " + id,
        type: "firebase",
        e: null,
      },
    };

  // Setup Listener
  if (listener) teamListener(ref);

  return team;
};

export const UPDATE_TEAM = async (
  id: string,
  team: TeamInterface,
  listener?: boolean
): Promise<null | ErrorInterface> => {
  // Update Team
  const firebaseRef = await update(`teams/${id}`, team, true);
  if (!firebaseRef || "error" in firebaseRef)
    return {
      error: {
        message: "Failed to update Team by id " + id,
        type: "firebase",
        e: null,
      },
    };

  // Setup Listener
  if (listener) teamListener(firebaseRef);

  return null;
};

export const UPDATE_TEAM_MEMBERS_DATA = async (
  id: string,
  membersData: TeamMembersInterface
): Promise<null | ErrorInterface> => {
  // Update Team MembersData
  let updateResponse = await update(`teams/${id}/teamData`, {
    members: membersData,
  });
  if (updateResponse && "error" in updateResponse)
    return {
      error: {
        message: "Failed to update Team Members Data by id " + id,
        type: "firebase",
        e: null,
      },
    };

  return null;
};

export const UPDATE_TEAM_IMAGE_ID = async (
  id: string,
  imageId: string | null
): Promise<null | ErrorInterface> => {
  // Update Team ImageId
  let updateResponse = await update(`teams/${id}/teamData`, {
    imageId: imageId,
  });
  if (updateResponse && "error" in updateResponse)
    return {
      error: {
        message: "Failed to update Team ImageId by id " + id,
        type: "firebase",
        e: null,
      },
    };

  return null;
};

export const UPDATE_TEAM_STATUS = async (
  id: string,
  status: string
): Promise<null | ErrorInterface> => {
  // Update Team Status
  let updateResponse = await update(`teams/${id}/teamData/settings`, {
    status: status,
  });
  if (updateResponse && "error" in updateResponse)
    return {
      error: {
        message: "Failed to update Team Status by id " + id,
        type: "firebase",
        e: null,
      },
    };

  return null;
};

export const UPDATE_TEAM_DESCRIPTION = async (
  id: string,
  description: string
): Promise<null | ErrorInterface> => {
  // Update Team Description
  let updateResponse = await update(`teams/${id}/teamData`, {
    description: description,
  });
  if (updateResponse && "error" in updateResponse)
    return {
      error: {
        message: "Failed to update Team Description by id " + id,
        type: "firebase",
        e: null,
      },
    };

  return null;
};

export const UPDATE_TEAM_DASHES = async (
  id: string,
  dashes: number
): Promise<null | ErrorInterface> => {
  // Update Team Dashes
  let updateResponse = await update(`teams/${id}/teamData/settings`, {
    dashes: dashes,
  });
  if (updateResponse && "error" in updateResponse)
    return {
      error: {
        message: "Failed to update Team Dashes by id " + id,
        type: "firebase",
        e: null,
      },
    };

  return null;
};

export const UPDATE_TEAM_HIDDEN_DASHER = async (
  id: string,
  hiddenDasher: boolean
): Promise<null | ErrorInterface> => {
  // Update Team Hidden Dasher
  let updateResponse = await update(`teams/${id}/teamData/settings`, {
    hiddenDasher: hiddenDasher,
  });
  if (updateResponse && "error" in updateResponse)
    return {
      error: {
        message: "Failed to update Team Hidden Dasher by id " + id,
        type: "firebase",
        e: null,
      },
    };

  return null;
};

export const UPDATE_TEAM_CREATOR_ID = async (
  id: string,
  creatorId: string
): Promise<null | ErrorInterface> => {
  // Update Team CreatorId
  let updateResponse = await update(`teams/${id}/teamData/members`, {
    creatorId: creatorId,
  });
  if (updateResponse && "error" in updateResponse)
    return {
      error: {
        message: "Failed to update Team CreatorId by id " + id,
        type: "firebase",
        e: null,
      },
    };

  return null;
};

export const UPDATE_TEAM_DEFINED_CAKES = async (
  id: string,
  definedCakes: boolean
): Promise<null | ErrorInterface> => {
  // Update Team Defined Cakes
  let updateResponse = await update(`teams/${id}/teamData/settings`, {
    definedCakes: definedCakes,
  });
  if (updateResponse && "error" in updateResponse)
    return {
      error: {
        message: "Failed to update Team Hidden Dasher by id " + id,
        type: "firebase",
        e: null,
      },
    };

  return null;
};

export const UPDATE_TEAM_NAME = async (
  id: string,
  name: string
): Promise<null | ErrorInterface> => {
  // Update Team Name
  let updateResponse = await update(`teams/${id}/teamData`, { name: name });
  if (updateResponse && "error" in updateResponse)
    return {
      error: {
        message: "Failed to update Team Name by id " + id,
        type: "firebase",
        e: null,
      },
    };

  return null;
};

export const UPDATE_TEAM_EVENT_IDS = async (
  id: string,
  eventIds: string[]
): Promise<null | ErrorInterface> => {
  // Update Team EventIds
  let updateResponse = await update(`teams/${id}`, { eventIds: eventIds });
  if (updateResponse && "error" in updateResponse)
    return {
      error: {
        message: "Failed to update Team EventIds by id " + id,
        type: "firebase",
        e: null,
      },
    };

  return null;
};

export const UPDATE_TEAM_PRODUCT_IDS = async (
  id: string,
  productIds: string[]
): Promise<null | ErrorInterface> => {
  // Update Team ProductIds
  let updateResponse = await update(`teams/${id}`, { productIds: productIds });
  if (updateResponse && "error" in updateResponse)
    return {
      error: {
        message: "Failed to update Team ProductIds by id " + id,
        type: "firebase",
        e: null,
      },
    };

  return null;
};

export const UPDATE_TEAM_CAKE_IDS = async (
  id: string,
  cakeIds: string[]
): Promise<null | ErrorInterface> => {
  // Update Team CakeIds
  let updateResponse = await update(`teams/${id}`, { cakeIds: cakeIds });
  if (updateResponse && "error" in updateResponse)
    return {
      error: {
        message: "Failed to update Team CakeIds by id " + id,
        type: "firebase",
        e: null,
      },
    };

  return null;
};

export const UPDATE_TEAM_ADMIN_IDS = async (
  id: string,
  adminIds: string[]
): Promise<null | ErrorInterface> => {
  // Update Team AdminIds
  let updateResponse = await update(`teams/${id}/teamData/members`, {
    adminIds: adminIds,
  });
  if (updateResponse && "error" in updateResponse)
    return {
      error: {
        message: "Failed to update Team AdminIds by id " + id,
        type: "firebase",
        e: null,
      },
    };

  return null;
};

export const REMOVE_TEAM = async (
  id: string
): Promise<null | ErrorInterface> => {
  // Remove Team
  let removeResponse = await remove(`teams/${id}`);
  if (removeResponse && "error" in removeResponse)
    return {
      error: {
        message: "Failed to remove Team by id " + id,
        type: "firebase",
        e: null,
      },
    };

  return null;
};

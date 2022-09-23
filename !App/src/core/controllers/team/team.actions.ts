import {
  TeamInterface,
  TeamMembersInterface,
  TeamSettingsInterface,
} from "./team.interface";
import {
  FETCH_TEAM,
  REMOVE_TEAM,
  UPDATE_TEAM,
  UPDATE_TEAM_ADMIN_IDS,
  UPDATE_TEAM_CAKE_IDS,
  UPDATE_TEAM_CREATOR_ID,
  UPDATE_TEAM_DASHES,
  UPDATE_TEAM_DEFINED_CAKES,
  UPDATE_TEAM_DESCRIPTION,
  UPDATE_TEAM_EVENT_IDS,
  UPDATE_TEAM_HIDDEN_DASHER,
  UPDATE_TEAM_IMAGE_ID,
  UPDATE_TEAM_MEMBERS_DATA,
  UPDATE_TEAM_NAME,
  UPDATE_TEAM_PRODUCT_IDS,
  UPDATE_TEAM_STATUS,
} from "./team.routes";
import { TEAMS } from "./team.controller";
import Firebase from "../../api/firebase/config.firebase";
import { LeaveTeamEvent } from "../event/types/leave-team-event";
import { JoinTeamEvent } from "../event/types/join-team-event";
import { generateId } from "../../helper/general/id.helper";
import { sendCoreLog } from "../../helper/general/logger.helper";
import {
  findMatchingValues,
  randomValue,
} from "../../helper/general/array.helper";
import {
  createMember,
  fetchMember,
  fetchMembers,
  removeMember,
  setMemberAdmin,
  setMemberCreator,
  setMemberCurrentProduct,
} from "../member/member.actions";
import { ImageInterface } from "../image/image.interface";
import { MEMBERS } from "../member/member.controller";
import { createImage, removeImage } from "../image/image.actions";
import {
  createProduct,
  fetchProducts,
  removeProduct,
} from "../product/product.actions";
import { fetchEvents, removeEvent } from "../event/event.actions";
import { fetchCakes, removeCake } from "../cake/cake.actions";
import { USER_ID } from "../auth/auth.controller";
import { ErrorInterface } from "../error/error.interface";
import { fetchUser } from "../user/user.actions";
import { USERS } from "../user/user.controller";
import { MemberInterface } from "../member/member.interface";

// Team Groups
// default
// userId

//======================================================================================================================
//Create Team
//======================================================================================================================

export const createTeam = async (
  name: string,
  description: string,
  image: ImageInterface | null,
  settings: TeamSettingsInterface,
  products?: { id: string; name: string; image: ImageInterface | null }[],
  id?: string
): Promise<TeamInterface | ErrorInterface> => {
  sendCoreLog("Create Team");

  // Creator Id
  const creatorId = generateId();

  // Team Id
  const teamId: string = id || generateId();

  // Create Image
  if (image) await createImage(image.imageData, image.id);

  // Create Team
  const team: TeamInterface = {
    id: teamId,
    eventIds: [],
    cakeIds: [],
    productIds: [],
    teamData: {
      name: name,
      description: description,
      imageId: image?.id || null,
      members: {
        adminIds: [creatorId],
        creatorId: creatorId,
        memberIds: [creatorId],
      },
      settings: settings,
    },
  };
  TEAMS.collect(team);

  if (products && settings.definedCakes) {
    // Create Products
    const productIds = products.map((product) => product.id);
    for (let i = 0; i < products.length; i++) {
      const product = await createProduct(
        products[i].name,
        products[i].image,
        teamId,
        products[i].id,
        false
      );
      if ("error" in product) return product;
    }

    // Update productIds
    team.productIds = productIds;
  }

  // Update Team
  const updateTeamResponse = await UPDATE_TEAM(teamId, team, true);
  if (updateTeamResponse !== null && "error" in updateTeamResponse)
    return updateTeamResponse;

  // Fetch User
  const userId = USER_ID.value;
  const user = await fetchUser(userId);
  if ("error" in user) return user;

  // Create Creator
  const creator = await createMember(
    teamId,
    user.id || "none",
    user.userData.name,
    user.userData.imageId,
    true,
    creatorId
  );
  if ("error" in creator) return creator;

  // Core
  TEAMS.getGroup(userId).add(teamId);

  sendCoreLog("End Create Team");
  return team;
};

//======================================================================================================================
// Fetch Team
//======================================================================================================================

export const fetchTeam = async (
  id: string
): Promise<TeamInterface | ErrorInterface> => {
  sendCoreLog("Fetch Team " + id);

  const team = TEAMS.getItemById(id);
  if (team && team.exists) return team.copy();

  // Firebase
  const firebaseTeam = await FETCH_TEAM(id, true);
  if ("error" in firebaseTeam) return firebaseTeam;

  // Check if Team Object is complete
  if (
    !firebaseTeam.teamData ||
    !firebaseTeam.teamData.members ||
    !firebaseTeam.teamData.settings
  )
    return {
      error: {
        message: "Failed to fetch Team!",
        type: "firebase",
        e: null,
      },
    };

  // Format Fetched Values
  firebaseTeam.eventIds = firebaseTeam.eventIds || [];
  firebaseTeam.teamData.imageId = firebaseTeam.teamData.imageId || null;
  firebaseTeam.cakeIds = firebaseTeam.cakeIds || [];
  firebaseTeam.teamData.members.memberIds =
    firebaseTeam.teamData.members.memberIds || [];
  firebaseTeam.teamData.members.adminIds =
    firebaseTeam.teamData.members.adminIds || [];
  firebaseTeam.productIds = firebaseTeam.productIds || [];

  // Core
  const user = await fetchUser(USER_ID.value);
  if (!("error" in user)) {
    if (
      findMatchingValues(
        user.memberIds,
        firebaseTeam.teamData.members.memberIds
      ).length > 0
    )
      TEAMS.collect(firebaseTeam, user.id);
  }
  TEAMS.collect(firebaseTeam, "default");

  // Fetch Items that belong to a team
  await fetchMembers(firebaseTeam.teamData.members.memberIds);
  await fetchEvents(firebaseTeam.eventIds);
  await fetchCakes(firebaseTeam.cakeIds);
  await fetchProducts(firebaseTeam.productIds);

  return firebaseTeam;
};

//======================================================================================================================
// Fetch Teams
//======================================================================================================================

export const fetchTeams = async (
  teamIds: string[]
): Promise<ErrorInterface | TeamInterface[]> => {
  sendCoreLog("Fetch Teams");

  // Error
  let error: ErrorInterface | null = null;

  // Teams
  const teams: TeamInterface[] = [];

  // Create Team Promises
  const teamPromises: Promise<TeamInterface | ErrorInterface>[] = [];
  for (let i = 0; i < teamIds.length; i++) {
    teamPromises.push(
      new Promise<TeamInterface | ErrorInterface>(async (resolve) => {
        resolve(await fetchTeam(teamIds[i]));
      })
    );
  }

  // Evaluate Team Promises
  const teamPromisesResult = await Promise.all(teamPromises);
  for (let i = 0; i < teamPromisesResult.length; i++) {
    if (!("error" in teamPromisesResult[i]))
      teams.push(teamPromisesResult[i] as TeamInterface);
    else error = teamPromisesResult[i] as ErrorInterface;
  }

  sendCoreLog("End Fetch Teams");
  return error || teams;
};

//======================================================================================================================
// Fetch Random Teams
//======================================================================================================================

export const fetchRandomTeams = async (
  x?: number,
  filteredName?: string
): Promise<TeamInterface[]> => {
  sendCoreLog("Fetch All Teams ", { x: x, filteredName: filteredName });

  // Teams
  const teams: TeamInterface[] = [];

  // Configure Firebase Fetch Settings
  let ref: any;
  if (filteredName && !x)
    ref = Firebase.database()
      .ref("teams")
      .orderByChild("teamData/name")
      .equalTo(filteredName);
  else if (x && !filteredName)
    ref = Firebase.database().ref("teams").limitToFirst(x);
  else if (filteredName && x)
    ref = Firebase.database()
      .ref("teams")
      .orderByChild("teamData/name")
      .equalTo(filteredName)
      .limitToFirst(x);
  else if (!filteredName && !x) ref = Firebase.database().ref("teams");
  const snapshot = await ref.once("value");
  const firebaseTeams = snapshot.val();

  for (let key in firebaseTeams) {
    // Get Firebase Team
    const team: TeamInterface = firebaseTeams[key];

    if (team && team.teamData) teams.push(team);
  }

  sendCoreLog("End Fetch All Teams");
  return teams;
};

//======================================================================================================================
// Remove Team
//======================================================================================================================

export const removeTeam = async (
  id: string
): Promise<ErrorInterface | null> => {
  sendCoreLog("Remove Team " + id);

  // Team
  const team = await fetchTeam(id);
  if ("error" in team) return team;

  // Remove Products
  for (let i = 0; i < team.productIds.length; i++) {
    await removeProduct(team.productIds[i], false);
  }

  // Remove Members
  for (let i = 0; i < team.teamData.members.memberIds.length; i++) {
    await removeMember(team.teamData.members.memberIds[i], false, false, false);
  }

  // Remove Cakes
  for (let i = 0; i < team.cakeIds.length; i++) {
    await removeCake(team.cakeIds[i], false, false);
  }

  // Remove Events
  for (let i = 0; i < team.eventIds.length; i++) {
    await removeEvent(team.eventIds[i], false, false);
  }

  // Remove Image
  if (team.teamData.imageId) await removeImage(team.teamData.imageId);

  // Remove Team
  const removeTeamResponse = await REMOVE_TEAM(id);
  if (removeTeamResponse !== null && "error" in removeTeamResponse)
    return removeTeamResponse;

  // Core
  TEAMS.remove(id).everywhere();

  sendCoreLog("End Remove Team " + id);
  return null;
};

//======================================================================================================================
// Set Team Name
//======================================================================================================================

export const setTeamName = async (
  id: string,
  name: string
): Promise<TeamInterface | ErrorInterface> => {
  sendCoreLog("Set Team Name " + id, { name: name });

  // Team
  const team = await fetchTeam(id);
  if ("error" in team) return team;

  // Update Values
  team.teamData.name = name;

  // Update Team Name
  const updateTeamNameResponse = await UPDATE_TEAM_NAME(id, name);
  if (updateTeamNameResponse !== null && "error" in updateTeamNameResponse)
    return updateTeamNameResponse;

  // Core
  TEAMS.update(id, team);

  sendCoreLog("End Set Team Name " + id);
  return team;
};

//======================================================================================================================
// Set Team Dashes
//======================================================================================================================

export const setTeamDashes = async (
  id: string,
  dashes: number
): Promise<TeamInterface | ErrorInterface> => {
  sendCoreLog("Set Team Dashes " + id, { dashes: dashes });

  // Team
  const team = await fetchTeam(id);
  if ("error" in team) return team;

  // Update Values
  team.teamData.settings.dashes = dashes;

  // Update Team Dashes
  const updateTeamDashesResponse = await UPDATE_TEAM_DASHES(id, dashes);
  if (updateTeamDashesResponse !== null && "error" in updateTeamDashesResponse)
    return updateTeamDashesResponse;

  // Core
  TEAMS.update(id, team);

  sendCoreLog("End Set Team Dashes " + id);
  return team;
};

//======================================================================================================================
// Set Team Description
//======================================================================================================================

export const setTeamDescription = async (
  id: string,
  description: string
): Promise<TeamInterface | ErrorInterface> => {
  sendCoreLog("Set Team Name " + id, { description: description });

  // Team
  const team = await fetchTeam(id);
  if ("error" in team) return team;

  // Update Values
  team.teamData.description = description;

  // Update Team Description
  const updateTeamDescriptionResponse = await UPDATE_TEAM_DESCRIPTION(
    id,
    description
  );
  if (
    updateTeamDescriptionResponse !== null &&
    "error" in updateTeamDescriptionResponse
  )
    return updateTeamDescriptionResponse;

  // Core
  TEAMS.update(id, team);

  sendCoreLog("End Set Team Description " + id);
  return team;
};

//======================================================================================================================
// Set Team Status
//======================================================================================================================

export const setTeamStatus = async (
  id: string,
  status: "open" | "closed" | "invite"
): Promise<TeamInterface | ErrorInterface> => {
  sendCoreLog("Set Team Name " + id, { status: status });

  // Team
  const team = await fetchTeam(id);
  if ("error" in team) return team;

  // Update Values
  team.teamData.settings.status = status;

  // Update Team Status
  const updateTeamStatusResponse = await UPDATE_TEAM_STATUS(id, status);
  if (updateTeamStatusResponse !== null && "error" in updateTeamStatusResponse)
    return updateTeamStatusResponse;

  // Core
  TEAMS.update(id, team);

  sendCoreLog("End Set Team Status " + id);
  return team;
};

//======================================================================================================================
// Set Team Defined Cakes
//======================================================================================================================

export const setTeamDefinedCakes = async (
  id: string,
  definedCakes: boolean
): Promise<TeamInterface | ErrorInterface> => {
  sendCoreLog("Set Team Defined Cakes " + id, { definedCakes: definedCakes });

  // Team
  const team = await fetchTeam(id);
  if ("error" in team) return team;

  // Update Values
  team.teamData.settings.definedCakes = definedCakes;

  // Update Team Defined Cakes
  const updateTeamDefinedCakesResponse = await UPDATE_TEAM_DEFINED_CAKES(
    id,
    definedCakes
  );
  if (
    updateTeamDefinedCakesResponse !== null &&
    "error" in updateTeamDefinedCakesResponse
  )
    return updateTeamDefinedCakesResponse;

  // Core
  TEAMS.update(id, team);

  sendCoreLog("End Set Team Defined Cakes " + id);
  return team;
};

//======================================================================================================================
// Set Team Hidden Dasher
//======================================================================================================================

export const setTeamHiddenDasher = async (
  id: string,
  hiddenDasher: boolean
): Promise<TeamInterface | ErrorInterface> => {
  sendCoreLog("Set Team Hidden Dasher " + id, { hiddenDasher: hiddenDasher });

  // Team
  const team = await fetchTeam(id);
  if ("error" in team) return team;

  // Update Values
  team.teamData.settings.hiddenDasher = hiddenDasher;

  // Update Team Hidden Dasher
  const updateTeamHiddenDasherResponse = await UPDATE_TEAM_HIDDEN_DASHER(
    id,
    hiddenDasher
  );
  if (
    updateTeamHiddenDasherResponse !== null &&
    "error" in updateTeamHiddenDasherResponse
  )
    return updateTeamHiddenDasherResponse;

  // Core
  TEAMS.update(id, team);

  sendCoreLog("End Set Team Hidden Dasher " + id);
  return team;
};

//======================================================================================================================
// Set Team CreatorId
//======================================================================================================================

export const setTeamCreatorId = async (
  id: string,
  creatorId: string
): Promise<TeamInterface | ErrorInterface> => {
  sendCoreLog("Set Team CreatorId " + id, { creatorId: creatorId });

  // Team
  const team = await fetchTeam(id);
  if ("error" in team) return team;

  // Update Values
  team.teamData.members.creatorId = creatorId;

  // Update Team CreatorId
  const updateTeamCreatorIdResponse = await UPDATE_TEAM_CREATOR_ID(
    id,
    creatorId
  );
  if (
    updateTeamCreatorIdResponse !== null &&
    "error" in updateTeamCreatorIdResponse
  )
    return updateTeamCreatorIdResponse;

  // Core
  TEAMS.update(id, team);

  sendCoreLog("End Set Team CreatorId " + id);
  return team;
};

//======================================================================================================================
// Set Team Image
//======================================================================================================================

export const setTeamImage = async (
  id: string,
  image: ImageInterface | null
): Promise<TeamInterface | ErrorInterface> => {
  sendCoreLog("Set Team Image " + id, { image: image });

  // Image Id
  let imageId = image?.id || null;

  // Team
  const team = await fetchTeam(id);
  if ("error" in team) return team;

  // Remove Image
  if (team.teamData.imageId) await removeImage(team.teamData.imageId);

  // Create Image
  if (image) {
    const newImage = await createImage(image.imageData, image.id);
    if ("error" in newImage) return newImage;
    imageId = newImage.id;
  }

  // Update Values
  team.teamData.imageId = imageId;

  // Update Team ImageId
  const updateTeamImageIdResponse = await UPDATE_TEAM_IMAGE_ID(id, imageId);
  if (
    updateTeamImageIdResponse !== null &&
    "error" in updateTeamImageIdResponse
  )
    return updateTeamImageIdResponse;

  // Core
  TEAMS.update(id, team);

  sendCoreLog("End Set Team ImageId " + id);
  return team;
};

//======================================================================================================================
// Update Team Products
//======================================================================================================================

export const setTeamProducts = async (
  id: string,
  products: {
    id: string;
    name: string;
    image: ImageInterface | null;
    imageId: string | null;
  }[]
): Promise<ErrorInterface | TeamInterface> => {
  sendCoreLog("Set Team Products " + id, { products: products });

  // Fetch Team
  const team = await fetchTeam(id);
  if ("error" in team) return team;

  // Fetch Members
  const members = await fetchMembers(team.teamData.members.memberIds);
  if ("error" in members) return members;

  // Old ProductIds
  const oldProductIds = [...team.productIds];

  // New ProductIds
  const newProductIds = products.map((product) => product.id);

  // Removed ProductIds
  const removedProductIds: string[] = [];

  // Check if Products have to be created
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    const isInProductIds =
      oldProductIds.findIndex((id) => id === product.id) !== -1;

    if (!isInProductIds) {
      // Create Product
      const createProductResponse = await createProduct(
        product.name,
        product.image,
        id,
        product.id,
        false
      );
      if (createProductResponse !== null && "error" in createProductResponse)
        return createProductResponse;
    }
  }

  // Check if Products have to be removed
  for (let i = 0; i < oldProductIds.length; i++) {
    const productId = oldProductIds[i];
    const isInProducts =
      products.findIndex((product) => product.id === productId) !== -1;

    if (!isInProducts) {
      // Remove Product
      const removeProductResponse = await removeProduct(productId, false);
      if (removeProductResponse !== null && "error" in removeProductResponse)
        return removeProductResponse;
      removedProductIds.push(productId);
    }
  }

  // Check if team has products.. -> DefinedCakes is active (Note can't check defined Cakes because it might already have changed before..)
  if (team.productIds.length > 0) {
    // Update Member Current Product from Members who has a removed Product
    for (let i = 0; i < removedProductIds.length; i++) {
      // Members with Product
      const membersWithProduct = members.filter(
        (member: any) => member.memberData.product.id === removedProductIds[i]
      );

      // Update Member Product
      for (let j = 0; j < membersWithProduct.length; j++) {
        // New ProductId
        let newProductId = null;
        if (newProductIds.length > 0) newProductId = randomValue(newProductIds);

        await setMemberCurrentProduct(
          membersWithProduct[j].id,
          newProductId,
          membersWithProduct[j].memberData.product.dashes,
          membersWithProduct[j].memberData.product.dashesNeeded
        );
      }
    }
  } else {
    // Update Member Current Product from all Members
    for (let i = 0; i < members.length; i++) {
      // New ProductId
      let newProductId = null;
      if (newProductIds.length > 0) newProductId = randomValue(newProductIds);

      await setMemberCurrentProduct(
        members[i].id,
        newProductId,
        members[i].memberData.product.dashes,
        members[i].memberData.product.dashesNeeded
      );
    }
  }

  // Update Values
  team.productIds = newProductIds;

  // Update Team ProductIds
  const updateTeamProductIdsResponse = await UPDATE_TEAM_PRODUCT_IDS(
    id,
    newProductIds
  );
  if (
    updateTeamProductIdsResponse !== null &&
    "error" in updateTeamProductIdsResponse
  )
    return updateTeamProductIdsResponse;

  // Core
  TEAMS.update(id, team);

  sendCoreLog("End Set Team Products " + id);
  return team;
};

//======================================================================================================================
//Update Team MemberIds
//======================================================================================================================

export const setTeamMemberIds = async (
  id: string,
  memberId: string,
  add: boolean
): Promise<TeamInterface | ErrorInterface | null> => {
  sendCoreLog("Set Team MemberIds " + id, { memberId: memberId, add: add });

  // Fetch Team
  const team = await fetchTeam(id);
  if ("error" in team) return team;

  let newMemberIds = [...team.teamData.members.memberIds];
  let newAdminIds = [...team.teamData.members.adminIds];
  let newCreatorId = team.teamData.members.creatorId;

  // Update Member Ids
  if (add) {
    newMemberIds.push(memberId);
  } else {
    newMemberIds = newMemberIds.filter((id) => id !== memberId);
    newAdminIds = newAdminIds.filter((id) => id !== memberId);
  }

  // Check if members are still in team
  if (newMemberIds.length <= 0) {
    // Remove Team
    const removeTeamResponse = await removeTeam(id);
    if (removeTeamResponse !== null && "error" in removeTeamResponse)
      return removeTeamResponse;

    return null;
  }

  // Get New Creator if creator left team
  if (memberId === team.teamData.members.creatorId) {
    if (newAdminIds.length > 0) {
      newCreatorId = randomValue(newAdminIds);
      await setMemberCreator(newCreatorId, true, false);
    } else {
      newCreatorId = randomValue(newMemberIds);
      newAdminIds.push(newCreatorId);
      await setMemberAdmin(newCreatorId, true, false);
      await setMemberCreator(newCreatorId, true, false);
    }
  }

  // New MembersData
  const newMembersData: TeamMembersInterface = {
    adminIds: newAdminIds,
    memberIds: newMemberIds,
    creatorId: newCreatorId,
  };

  // Update Values
  team.teamData.members = newMembersData;

  // Update Team Members Data
  const updateTeamMembersDataResponse = await UPDATE_TEAM_MEMBERS_DATA(
    id,
    newMembersData
  );
  if (
    updateTeamMembersDataResponse !== null &&
    "error" in updateTeamMembersDataResponse
  )
    return updateTeamMembersDataResponse;

  // Core
  TEAMS.update(id, team);

  sendCoreLog("End Set Team MemberIds " + id);
  return team;
};

//======================================================================================================================
// Update Team EventIds
//======================================================================================================================

export const setTeamEventIds = async (
  id: string,
  eventId: string,
  add: boolean
): Promise<TeamInterface | ErrorInterface> => {
  sendCoreLog("Set Team EventIds " + id, { eventId: eventId, add: add });

  // Fetch Team
  const team = await fetchTeam(id);
  if ("error" in team) return team;

  // Update EventIds
  let newEventIds = [...team.eventIds];
  if (add) newEventIds.push(eventId);
  else newEventIds = newEventIds.filter((id) => id !== eventId);

  // Update Values
  team.eventIds = newEventIds;

  // Update Team EventIds
  const updateTeamEventIdsResponse = await UPDATE_TEAM_EVENT_IDS(
    id,
    newEventIds
  );
  if (
    updateTeamEventIdsResponse !== null &&
    "error" in updateTeamEventIdsResponse
  )
    return updateTeamEventIdsResponse;

  // Core
  TEAMS.update(id, team);

  sendCoreLog("End Set Team EventIds " + id);
  return team;
};

//======================================================================================================================
// Update Team ProductIds
//======================================================================================================================

export const setTeamProductIds = async (
  id: string,
  productId: string,
  add: boolean
): Promise<TeamInterface | ErrorInterface> => {
  sendCoreLog("Set Team ProductIds " + id, { productId: productId, add: add });

  // Fetch Team
  const team = await fetchTeam(id);
  if ("error" in team) return team;

  // Update ProductIds
  let newProductIds = [...team.productIds];
  if (add) newProductIds.push(productId);
  else newProductIds = newProductIds.filter((id) => id !== productId);

  // Update Values
  team.productIds = newProductIds;

  // Update Team ProductIds
  const updateTeamProductIdsResponse = await UPDATE_TEAM_PRODUCT_IDS(
    id,
    newProductIds
  );
  if (
    updateTeamProductIdsResponse !== null &&
    "error" in updateTeamProductIdsResponse
  )
    return updateTeamProductIdsResponse;

  // Core
  TEAMS.update(id, team);

  sendCoreLog("End Set Team ProductIds " + id);
  return team;
};

//======================================================================================================================
// Update Team AdminIds
//======================================================================================================================

export const setTeamAdminIds = async (
  id: string,
  adminId: string,
  add: boolean
): Promise<TeamInterface | ErrorInterface> => {
  sendCoreLog("Set Team AdminIds " + id, { adminId: adminId, add: add });

  // Fetch Team
  const team = await fetchTeam(id);
  if ("error" in team) return team;

  // Update AdminIds
  let newAdminIds = [...team.teamData.members.adminIds];
  if (add) newAdminIds.push(adminId);
  else newAdminIds = newAdminIds.filter((id) => id !== adminId);

  // Update Values
  team.teamData.members.adminIds = newAdminIds;

  // Update Team AdminIds
  const updateTeamAdminIdsResponse = await UPDATE_TEAM_ADMIN_IDS(
    id,
    newAdminIds
  );
  if (
    updateTeamAdminIdsResponse !== null &&
    "error" in updateTeamAdminIdsResponse
  )
    return updateTeamAdminIdsResponse;

  // Core
  TEAMS.update(id, team);

  sendCoreLog("End Set Team AdminIds " + id);
  return team;
};

//======================================================================================================================
//Update Team CakeIds
//======================================================================================================================

export const setTeamCakeIds = async (
  id: string,
  cakeId: string,
  add: boolean
): Promise<TeamInterface | ErrorInterface> => {
  sendCoreLog("Set Team CakeIds " + id, { cakeId: cakeId, add: add });

  // Fetch Team
  const team = await fetchTeam(id);
  if ("error" in team) return team;

  // Update CakeIds
  let newCakeIds = [...team.cakeIds];
  if (add) newCakeIds.push(cakeId);
  else newCakeIds = newCakeIds.filter((id) => id !== cakeId);

  // Update Values
  team.cakeIds = newCakeIds;

  // Update Team Cake Ids
  const updateTeamCakeIdsResponse = await UPDATE_TEAM_CAKE_IDS(id, newCakeIds);
  if (
    updateTeamCakeIdsResponse !== null &&
    "error" in updateTeamCakeIdsResponse
  )
    return updateTeamCakeIdsResponse;

  // Core
  TEAMS.update(id, team);

  sendCoreLog("End Set Team CakeIds " + id);
  return team;
};

//======================================================================================================================
// Join Team
//======================================================================================================================

export const joinTeam = async (
  teamId: string,
  userId: string
): Promise<ErrorInterface | null> => {
  sendCoreLog("Join Team " + teamId, { userId: userId });

  // Fetch User
  const user = await fetchUser(userId);
  if ("error" in user) return user;

  // Fetch Team
  const team = await fetchTeam(teamId);
  if ("error" in team) return team;

  // Core (Have to collect here because the default group doesn't get changed behind the createMemberAction -> doesn't update USER_TEAMS)
  TEAMS.collect(team, userId);

  // Create Member
  const member = await createMember(
    teamId,
    user.id,
    user.userData.name,
    user.userData.imageId,
    false
  );
  if ("error" in member) {
    TEAMS.remove(teamId).everywhere();
    return member;
  }

  // Event
  if (team.teamData.settings.showJoinLeaveEvents) {
    const joinTeamEventResponse = await JoinTeamEvent(teamId, member.id);
    if ("error" in joinTeamEventResponse) return joinTeamEventResponse;
  }

  sendCoreLog("End Join Team " + teamId);
  return null;
};

//======================================================================================================================
// Leave Team
//======================================================================================================================

export const leaveTeam = async (
  memberId: string
): Promise<ErrorInterface | null> => {
  sendCoreLog("Leave Team", { memberId: memberId });

  // Fetch Member
  const member = await fetchMember(memberId);
  if ("error" in member) return member;

  // Fetch Team
  const team = await fetchTeam(member.teamId);
  if ("error" in team) return team;

  // Remove Member
  const removeMemberResponse = await removeMember(memberId);
  if (removeMemberResponse !== null && "error" in removeMemberResponse)
    return removeMemberResponse;

  // Event
  if (team.teamData.settings.showJoinLeaveEvents) {
    const leaveTeamEventResponse = await LeaveTeamEvent(
      member.teamId,
      memberId
    );
    if ("error" in leaveTeamEventResponse) return leaveTeamEventResponse;
  }

  // Core
  TEAMS.remove(member.teamId).everywhere();

  sendCoreLog("End Leave Team");
  return null;
};

//======================================================================================================================
// Get User Member
//======================================================================================================================

export const getUserMember = (id: string): MemberInterface | null => {
  sendCoreLog("Get User Member ", { teamId: id });

  // Get Team and User
  const user = USERS.getValueById(USER_ID.value);
  const team = TEAMS.getValueById(id);
  if (!team || !user) return null;

  // Get MemberIds
  const memberIds: string[] = findMatchingValues(
    user.memberIds,
    team.teamData.members.memberIds
  );
  if (memberIds.length <= 0) return null;

  sendCoreLog("End Get User Member");
  return MEMBERS.getValueById(memberIds[0]) || null;
};

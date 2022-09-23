import {
  MemberInterface,
  MemberProductInterface,
  RoleType,
} from "./member.interface";
import {
  FETCH_MEMBER,
  REMOVE_MEMBER,
  UPDATE_MEMBER,
  UPDATE_MEMBER_CAKE_IDS,
  UPDATE_MEMBER_CURRENT_PRODUCT,
  UPDATE_MEMBER_EVENT_IDS,
  UPDATE_MEMBER_IMAGE_ID,
  UPDATE_MEMBER_NAME,
  UPDATE_MEMBER_ROLE,
  UPDATE_MEMBER_STATS,
} from "./member.routes";
import { MEMBERS } from "./member.controller";
import { BringCakeEvent } from "../event/types/bring-cake-event";
import { AddCakeEvent } from "../event/types/add-cake-event";
import { AddDashEvent } from "../event/types/add-dash-event";
import { generateId } from "../../helper/general/id.helper";
import { randomValue } from "../../helper/general/array.helper";
import { sendCoreLog } from "../../helper/general/logger.helper";
import {
  createCake,
  fetchCake,
  removeCake,
  setCakeIsVisible,
} from "../cake/cake.actions";
import { ImageInterface } from "../image/image.interface";
import { createImage } from "../image/image.actions";
import { removeEvent } from "../event/event.actions";
import {
  fetchUser,
  setUserMemberIds,
  setUserStats,
} from "../user/user.actions";
import {
  fetchTeam,
  setTeamAdminIds,
  setTeamCakeIds,
  setTeamCreatorId,
  setTeamMemberIds,
} from "../team/team.actions";
import { USER_ID } from "../auth/auth.controller";
import { ErrorInterface } from "../error/error.interface";
import { CAKES } from "../cake/cake.controller";
import { TEAMS } from "../team/team.controller";

// Member Groups:
// default
// userId
// teamId

//======================================================================================================================
//Create Member
//======================================================================================================================

export const createMember = async (
  teamId: string,
  userId: string,
  name: string,
  imageId: string | null,
  isCreator: boolean,
  id?: string
): Promise<MemberInterface | ErrorInterface> => {
  sendCoreLog("Create Member");

  // Member
  let memberId = id || generateId();
  let member: MemberInterface;

  // Fetch Team
  const team = await fetchTeam(teamId);
  if ("error" in team) return team;

  // Get first Product
  let firstProductId: string | null = null;
  if (team.productIds.length > 0 && team.teamData.settings.definedCakes)
    firstProductId = randomValue(team.productIds);

  //Create Member
  member = {
    id: memberId,
    teamId: teamId,
    userId: userId,
    cakeIds: [],
    eventIds: [],
    // @ts-ignore
    memberData: {
      name: name,
      imageId: imageId,
      role: isCreator ? "creator" : "member",
      stats: {
        productsMade: [],
        starAverage: 0,
        totalDashes: 0,
      },
      product: {
        id: firstProductId,
        dashes: 0,
        dashesNeeded: team.teamData.settings.dashes,
      },
      // status: 'blabla' have not to be set in firebase.. it depends on the user
    },
  };

  // Update Member
  const updateMemberResponse = await UPDATE_MEMBER(memberId, member, true);
  if (updateMemberResponse !== null && "error" in updateMemberResponse)
    return updateMemberResponse;

  // Core
  MEMBERS.collect(member, teamId);
  if (userId === USER_ID.value) MEMBERS.collect(member, userId);
  MEMBERS.collect(member, "default");

  // Update User MemberIds
  const updatedUser = await setUserMemberIds(userId, memberId, true);
  if ("error" in updatedUser) return updatedUser;

  // Update Team MemberIds (Creator MemberId has been added directly)
  if (!isCreator) {
    const updatedTeam = await setTeamMemberIds(teamId, memberId, true);
    if (updatedTeam !== null && "error" in updatedTeam) return updatedTeam;
  }

  sendCoreLog("End Create Member");
  return member;
};

//======================================================================================================================
// Remove Member
//======================================================================================================================

export const removeMember = async (
  id: string,
  _removeCakes = true,
  _removeEvents = true,
  _setTeamMemberIds = true
): Promise<ErrorInterface | null> => {
  sendCoreLog("Remove Member " + id);

  // Fetch Member
  const member = await fetchMember(id);
  if ("error" in member) return member;

  // Update User MemberIds
  const updatedUser = await setUserMemberIds(member.userId, id, false);
  if ("error" in updatedUser) return updatedUser;

  // Update Team MemberIds
  if (_setTeamMemberIds) {
    const updatedTeam = await setTeamMemberIds(member.teamId, member.id, false);
    if (updatedTeam !== null && "error" in updatedTeam) return updatedTeam;
  }

  // Remove Cakes
  if (_removeCakes && member.cakeIds) {
    for (let i = 0; i < member.cakeIds.length; i++) {
      await removeCake(member.cakeIds[i], undefined, true);
    }
  }

  // Remove Events
  if (_removeEvents && member.eventIds) {
    for (let i = 0; i < member.eventIds.length; i++) {
      await removeEvent(member.eventIds[i]);
    }
  }

  // Remove Member
  const removeMemberResponse = await REMOVE_MEMBER(id);
  if (removeMemberResponse !== null && "error" in removeMemberResponse)
    return removeMemberResponse;

  // Core
  MEMBERS.remove(id).everywhere();
  if (member.userId === USER_ID.value) {
    TEAMS.removeFromGroups(member.teamId, member.userId);
    MEMBERS.removeFromGroups(member.id, member.userId);
  }

  sendCoreLog("End Remove Member " + id);
  return null;
};

//======================================================================================================================
// Fetch Member
//======================================================================================================================

export const fetchMember = async (
  id: string
): Promise<MemberInterface | ErrorInterface> => {
  sendCoreLog("Fetch Member " + id);

  const member = MEMBERS.getItemById(id);
  if (member && member.exists) return member.copy();

  // Fetch Member
  const firebaseMember = await FETCH_MEMBER(id, true);
  if ("error" in firebaseMember) return firebaseMember;

  // Check if Member Object is complete
  if (
    !firebaseMember.memberData ||
    !firebaseMember.memberData.product ||
    !firebaseMember.memberData.stats
  )
    return {
      error: {
        message: "Failed to fetch Member!",
        type: "firebase",
        e: null,
      },
    };

  // Format Fetched Values
  firebaseMember.memberData.imageId = firebaseMember.memberData.imageId || null;
  firebaseMember.cakeIds = firebaseMember.cakeIds || [];
  firebaseMember.eventIds = firebaseMember.eventIds || [];
  firebaseMember.memberData.product.id =
    firebaseMember.memberData.product.id || null;
  const memberUser = await fetchUser(firebaseMember.userId);
  firebaseMember.memberData.status =
    firebaseMember.userId === USER_ID.value
      ? "online"
      : !("error" in memberUser)
      ? memberUser.userData.status
      : "offline";

  // Core
  MEMBERS.collect(firebaseMember, firebaseMember.teamId);
  if (firebaseMember.userId === USER_ID.value)
    MEMBERS.collect(firebaseMember, firebaseMember.userId);

  return firebaseMember;
};

//======================================================================================================================
// Fetch Members
//======================================================================================================================

export const fetchMembers = async (
  memberIds: string[]
): Promise<ErrorInterface | MemberInterface[]> => {
  sendCoreLog("Fetch Members");

  // Error
  let error: ErrorInterface | null = null;

  // Members
  const members: MemberInterface[] = [];

  // Create Member Promises
  const memberPromises: Promise<MemberInterface | ErrorInterface>[] = [];
  for (let i = 0; i < memberIds.length; i++) {
    memberPromises.push(
      new Promise<MemberInterface | ErrorInterface>(async (resolve) => {
        resolve(await fetchMember(memberIds[i]));
      })
    );
  }

  // Evaluate Member Promises
  const memberPromisesResult = await Promise.all(memberPromises);
  for (let i = 0; i < memberPromisesResult.length; i++) {
    if (!("error" in memberPromisesResult[i]))
      members.push(memberPromisesResult[i] as MemberInterface);
    else error = memberPromisesResult[i] as ErrorInterface;
  }

  sendCoreLog("End Fetch Members");
  return error || members;
};

//======================================================================================================================
// Set Member Name
//======================================================================================================================

export const setMemberName = async (
  id: string,
  name: string
): Promise<MemberInterface | ErrorInterface> => {
  sendCoreLog("Set Member Name " + id, { name: name });

  // Fetch Member
  const member = await fetchMember(id);
  if ("error" in member) return member;

  // Update Values
  member.memberData.name = name;

  // Update Member Name
  const updateMemberNameResponse = await UPDATE_MEMBER_NAME(id, name);
  if (updateMemberNameResponse !== null && "error" in updateMemberNameResponse)
    return updateMemberNameResponse;

  // Core
  MEMBERS.update(id, member);

  sendCoreLog("End Set Member Name " + id);
  return member;
};

//======================================================================================================================
// Set Member ImageId
//======================================================================================================================

export const setMemberImageId = async (
  id: string,
  imageId: string | null
): Promise<MemberInterface | ErrorInterface> => {
  sendCoreLog("Set Member ImageId " + id, { imageId: imageId });

  // Member
  const member = await fetchMember(id);
  if ("error" in member) return member;

  // Update Values
  member.memberData.imageId = imageId;

  // Update Member Image Id
  const updateMemberImageIdResponse = await UPDATE_MEMBER_IMAGE_ID(id, imageId);
  if (
    updateMemberImageIdResponse !== null &&
    "error" in updateMemberImageIdResponse
  )
    return updateMemberImageIdResponse;

  // Core
  MEMBERS.update(id, member);

  sendCoreLog("End Set MemberImageId " + id);
  return member;
};

//======================================================================================================================
// Set Member Current Product
//======================================================================================================================

export const setMemberCurrentProduct = async (
  id: string,
  productId: string | null,
  dashes?: number,
  dashesNeeded?: number
): Promise<MemberInterface | ErrorInterface> => {
  sendCoreLog("Set Member CurrentProduct " + id, {
    productId: productId,
    dashes: dashes,
    dashesNeeded: dashesNeeded,
  });

  // Fetch Member
  const member = await fetchMember(id);
  if ("error" in member) return member;

  // Create new Current Product
  const newCurrentProduct = { ...member.memberData.product };
  if (dashes) newCurrentProduct.dashes = dashes;
  if (dashesNeeded) newCurrentProduct.dashesNeeded = dashesNeeded;
  newCurrentProduct.id = productId;

  // Update Values
  member.memberData.product = newCurrentProduct;

  // Update Member Current Product
  const updateMemberCurrentProductResponse = await UPDATE_MEMBER_CURRENT_PRODUCT(
    id,
    newCurrentProduct
  );
  if (
    updateMemberCurrentProductResponse !== null &&
    "error" in updateMemberCurrentProductResponse
  )
    return updateMemberCurrentProductResponse;

  // Core
  MEMBERS.update(id, member);

  sendCoreLog("End Set Member CurrentProduct " + id);
  return member;
};

//======================================================================================================================
// Update Member Admin
//======================================================================================================================

export const setMemberAdmin = async (
  id: string,
  admin: boolean,
  _setTeamAdminIds = true
): Promise<MemberInterface | ErrorInterface> => {
  sendCoreLog("Set Member Admin " + id, { admin: admin });

  // Fetch Member
  const member = await fetchMember(id);
  if ("error" in member) return member;

  const newRole: RoleType = admin ? "admin" : "member";

  // Update Values
  member.memberData.role = newRole;

  // Update Team AdminIds
  if (_setTeamAdminIds) {
    const updatedTeam = await setTeamAdminIds(member.teamId, id, admin);
    if ("error" in updatedTeam) return updatedTeam;
  }

  // Update Member Role
  const updateMemberAdminResponse = await UPDATE_MEMBER_ROLE(id, newRole);
  if (
    updateMemberAdminResponse !== null &&
    "error" in updateMemberAdminResponse
  )
    return updateMemberAdminResponse;

  // Core
  MEMBERS.update(id, member);

  sendCoreLog("End Set Member Admin " + id);
  return member;
};

//======================================================================================================================
// Update Member Creator
//======================================================================================================================

export const setMemberCreator = async (
  id: string,
  creator: boolean,
  _setTeamCreatorId = true
): Promise<MemberInterface | ErrorInterface> => {
  sendCoreLog("Set Member Creator " + id, { creator: creator });

  // Fetch Member
  const member = await fetchMember(id);
  if ("error" in member) return member;

  // Fetch Team
  const team = await fetchTeam(member.teamId);
  if ("error" in team) return team;

  const oldCreatorId = team.teamData.members.creatorId;
  const newRole: RoleType = creator ? "creator" : "admin";

  // Update Values
  member.memberData.role = newRole;

  if (_setTeamCreatorId && creator) {
    // Update Team CreatorId
    const updatedTeam = await setTeamCreatorId(member.teamId, id);
    if ("error" in updatedTeam) return updatedTeam;

    // Remove current Creator
    const updatedOldCreator = await setMemberCreator(oldCreatorId, false);
    if ("error" in updatedOldCreator) return updatedOldCreator;
  }

  // Update Member Role
  const updateMemberCreatorResponse = await UPDATE_MEMBER_ROLE(id, newRole);
  if (
    updateMemberCreatorResponse !== null &&
    "error" in updateMemberCreatorResponse
  )
    return updateMemberCreatorResponse;

  // Core
  MEMBERS.update(id, member);

  sendCoreLog("End Set Member Creator " + id);
  return member;
};

//======================================================================================================================
// Set Member CakeIds
//======================================================================================================================

export const setMemberCakeIds = async (
  id: string,
  cakeId: string,
  add: boolean
): Promise<MemberInterface | ErrorInterface> => {
  sendCoreLog("Set Member CakeIds " + id, { cakeId: cakeId, add: add });

  // Fetch Member
  const member = await fetchMember(id);
  if ("error" in member) return member;

  // Update CakeIds
  let newCakeIds = [...member.cakeIds];
  if (add) newCakeIds.push(cakeId);
  else newCakeIds = newCakeIds.filter((id) => id !== cakeId);

  // Update Values
  member.cakeIds = newCakeIds;

  // Update Member CakeIds
  const updateMemberCakeIdsResponse = await UPDATE_MEMBER_CAKE_IDS(
    id,
    newCakeIds
  );
  if (
    updateMemberCakeIdsResponse !== null &&
    "error" in updateMemberCakeIdsResponse
  )
    return updateMemberCakeIdsResponse;

  // Core
  MEMBERS.update(id, member);
  if (!add) CAKES.removeFromGroups(cakeId, [member.id, member.userId]);

  sendCoreLog("End Set Member CakeIds " + id);
  return member;
};

//======================================================================================================================
// Set Member EventIds
//======================================================================================================================

export const setMemberEventIds = async (
  id: string,
  eventId: string,
  add: boolean
): Promise<MemberInterface | ErrorInterface> => {
  sendCoreLog("Set Member EventIds " + id, { eventId: eventId, add: add });

  // Fetch Member
  const member = await fetchMember(id);
  if ("error" in member) return member;

  // Update EventIds
  let newEventIds = [...member.eventIds];
  if (add) newEventIds.push(eventId);
  else newEventIds = newEventIds.filter((id) => id !== eventId);

  // Update Values
  member.eventIds = newEventIds;

  // Update Member EventIds
  const updateMemberEventIdsResponse = await UPDATE_MEMBER_EVENT_IDS(
    id,
    newEventIds
  );
  if (
    updateMemberEventIdsResponse !== null &&
    "error" in updateMemberEventIdsResponse
  )
    return updateMemberEventIdsResponse;

  // Core
  MEMBERS.update(id, member);

  sendCoreLog("End Set Member EventIds " + id);
  return member;
};

//======================================================================================================================
// Add Member Dash
//======================================================================================================================

export const addMemberDash = async (
  id: string,
  teamId: string
): Promise<MemberInterface | ErrorInterface> => {
  sendCoreLog("Add Member Dash " + id);

  // Fetch Member
  const member = await fetchMember(id);
  if ("error" in member) return member;

  // Fetch Team
  const team = await fetchTeam(teamId);
  if ("error" in team) return team;

  // Fetch User
  const user = await fetchUser(member.userId);
  if ("error" in user) return user;

  // Update Product
  let newProduct = { ...member.memberData.product };
  newProduct.dashes += 1;

  // Update Stats
  let newMemberStats = { ...member.memberData.stats };
  newMemberStats.totalDashes += 1;

  let newUserStats = { ...user.userData.stats };
  newUserStats.totalDashes += 1;

  // Update User Stats
  await setUserStats(user.id, newUserStats);

  // Update Values
  member.memberData.product = newProduct;
  member.memberData.stats = newMemberStats;

  // Create Event
  const addDashEventResponse = await AddDashEvent(teamId, id);
  if ("error" in addDashEventResponse) return addDashEventResponse;

  // Add Cake to Member
  if (newProduct.dashes >= member.memberData.product.dashesNeeded) {
    const updatedMember = await addMemberCake(id, teamId);
    if ("error" in updatedMember) return updatedMember;

    // Update Member Product
    newProduct = updatedMember.memberData.product;
    member.memberData.product = newProduct;
  }

  // Update Member Current Product
  const updateMemberCurrentProductResponse = await UPDATE_MEMBER_CURRENT_PRODUCT(
    id,
    newProduct
  );
  if (
    updateMemberCurrentProductResponse !== null &&
    "error" in updateMemberCurrentProductResponse
  )
    return updateMemberCurrentProductResponse;

  // Update Member Stats
  const updateMemberStatsResponse = await UPDATE_MEMBER_STATS(
    id,
    newMemberStats
  );
  if (
    updateMemberStatsResponse !== null &&
    "error" in updateMemberStatsResponse
  )
    return updateMemberStatsResponse;

  // Core
  MEMBERS.update(id, member);

  sendCoreLog("End Add Member Dash " + id);
  return member;
};

//======================================================================================================================
// Add Member Cake
//======================================================================================================================

export const addMemberCake = async (
  id: string,
  teamId: string
): Promise<MemberInterface | ErrorInterface> => {
  sendCoreLog("Add Member Cake " + id);

  // Fetch Member
  const member = await fetchMember(id);
  if ("error" in member) return member;

  // Fetch Team
  const team = await fetchTeam(teamId);
  if ("error" in team) return team;

  // Create Cake
  const cake = await createCake(teamId, id, member.memberData.product.id);
  if ("error" in cake) return cake;

  // Create Event
  const addCakeEventResponse = await AddCakeEvent(
    teamId,
    id,
    member.memberData.product.id
  );
  if ("error" in addCakeEventResponse) return addCakeEventResponse;

  // Create New Product
  let newProductId: string | null = null;
  if (team.productIds.length > 0 && team.teamData.settings.definedCakes)
    newProductId = randomValue(team.productIds);
  const newCurrentProduct: MemberProductInterface = {
    id: newProductId,
    dashes: 0,
    dashesNeeded: team.teamData.settings.dashes,
  };

  // Update Values
  member.memberData.product = newCurrentProduct;

  // Update Member Current Product
  const updateMemberCurrentProductResponse = await UPDATE_MEMBER_CURRENT_PRODUCT(
    id,
    newCurrentProduct
  );
  if (
    updateMemberCurrentProductResponse !== null &&
    "error" in updateMemberCurrentProductResponse
  )
    return updateMemberCurrentProductResponse;

  // Core
  MEMBERS.update(id, member);

  sendCoreLog("End Add Member Cake " + id);
  return member;
};

//======================================================================================================================
// Bring Cake
//======================================================================================================================

export const bringCake = async (
  cakeId: string,
  images: ImageInterface[],
  description: string,
  name: string
): Promise<ErrorInterface | null> => {
  sendCoreLog("Bring Cake ", { cakeId: cakeId });

  // Fetch Cake
  const cake = await fetchCake(cakeId);
  if ("error" in cake) return cake;

  // Fetch Member
  const member = await fetchMember(cake.memberId);
  if ("error" in member) return member;

  // Fetch Team
  const team = await fetchTeam(member.teamId);
  if ("error" in team) return team;

  // Create Images
  const imageIds: string[] = [];
  for (let i = 0; i < images.length; i++) {
    const newImage = await createImage(images[i].imageData, images[i].id);
    if (!("error" in newImage)) imageIds.push(images[i].id);
  }

  // Set Cake Is Visible
  const setCakeIsVisibleResponse = await setCakeIsVisible(cakeId, false);
  if ("error" in setCakeIsVisibleResponse) return setCakeIsVisibleResponse;

  // Create Event
  const bringCakeEventResponse = await BringCakeEvent(
    cake.teamId,
    cake.memberId,
    cakeId,
    description,
    name,
    imageIds,
    Math.floor(team.teamData.members.memberIds.length / 2)
  );
  if ("error" in bringCakeEventResponse) return bringCakeEventResponse;

  // Remove CakeId from Member
  const updatedMember = await setMemberCakeIds(cake.memberId, cake.id, false);
  if ("error" in updatedMember) return updatedMember;

  // Remove CakeId from Team
  const updatedTeam = await setTeamCakeIds(cake.teamId, cake.id, false);
  if ("error" in updatedTeam) return updatedTeam;

  sendCoreLog("End Bring Cake");
  return null;
};

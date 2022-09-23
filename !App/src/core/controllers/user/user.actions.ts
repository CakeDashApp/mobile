import {
  StatusType,
  UserInterface,
  UserStatsInterface,
} from "./user.interface";
import {
  FETCH_USER,
  REMOVE_USER,
  UPDATE_USER,
  UPDATE_USER_DESCRIPTION,
  UPDATE_USER_IMAGE_ID,
  UPDATE_USER_MEMBER_IDS,
  UPDATE_USER_NAME,
  UPDATE_USER_STATS,
  UPDATE_USER_STATUS,
} from "./user.routes";
import { USERS } from "./user.controller";
import { sendCoreLog } from "../../helper/general/logger.helper";
import { generateLightColor } from "../../helper/general/color.helper";
import { generateId } from "../../helper/general/id.helper";
import { ErrorInterface } from "../error/error.interface";
import {
  removeMember,
  setMemberImageId,
  setMemberName,
} from "../member/member.actions";
import { ImageInterface } from "../image/image.interface";
import { createImage, removeImage } from "../image/image.actions";
import { deleteUser } from "../auth/auth.actions";

//======================================================================================================================
// Create User
//======================================================================================================================

export const createUser = async (
  name: string,
  id?: string
): Promise<UserInterface | ErrorInterface> => {
  sendCoreLog("Create User");

  // Create Image
  let imageId = null;
  const image = await createImage({
    color: generateLightColor(),
    icon: "user",
  });
  if (!("error" in image)) imageId = image.id;

  // User Id
  const userId = id || generateId();

  // Create User
  const user: UserInterface = {
    id: userId,
    memberIds: [],
    userData: {
      name: name,
      description: "none",
      imageId: imageId,
      badges: [],
      stats: {
        totalCakes: 0,
        totalDashes: 0,
        bakeSkill: 0,
      },
      status: "online",
    },
  };

  // Update User
  const updateUserResponse = await UPDATE_USER(userId, user, true);
  if (updateUserResponse !== null && "error" in updateUserResponse)
    return updateUserResponse;

  // Core
  USERS.collect(user, "default");

  sendCoreLog("End Create User");
  return user;
};

//======================================================================================================================
// Fetch User
//======================================================================================================================

export const fetchUser = async (
  id: string
): Promise<UserInterface | ErrorInterface> => {
  sendCoreLog("Fetch User " + id);

  const user = USERS.getItemById(id);
  if (user && user.exists) return user.copy();

  // Fetch User
  const firebaseUser = await FETCH_USER(id, true);
  if ("error" in firebaseUser) return firebaseUser;

  // Check if User Object is complete
  if (!firebaseUser.userData)
    return {
      error: {
        message: "Failed to fetch User!",
        type: "firebase",
        e: null,
      },
    };

  // Format Fetched Values
  firebaseUser.memberIds = firebaseUser.memberIds || [];
  firebaseUser.userData.imageId = firebaseUser.userData.imageId || null;
  firebaseUser.userData.badges = firebaseUser.userData.badges || [];

  USERS.collect(firebaseUser);

  return firebaseUser;
};

//======================================================================================================================
// Set User Name
//======================================================================================================================

export const setUserName = async (
  id: string,
  name: string
): Promise<UserInterface | ErrorInterface> => {
  sendCoreLog("Set User Name " + id, { name: name });

  // Fetch User
  const user = await fetchUser(id);
  if ("error" in user) return user;

  // Update Member Name
  for (let i = 0; i < user.memberIds.length; i++)
    await setMemberName(user.memberIds[i], name);

  // Update Values
  user.userData.name = name;

  // Firebase
  const updateUserNameResponse = await UPDATE_USER_NAME(id, name);
  if (updateUserNameResponse !== null && "error" in updateUserNameResponse)
    return updateUserNameResponse;

  // Core
  USERS.update(id, user);

  sendCoreLog("End Set User Name " + id);
  return user;
};

//======================================================================================================================
// Set User Stats
//======================================================================================================================

export const setUserStats = async (
  id: string,
  stats: UserStatsInterface
): Promise<UserInterface | ErrorInterface> => {
  sendCoreLog("Set User Stats " + id, { stats: stats });

  // Fetch User
  const user = await fetchUser(id);
  if ("error" in user) return user;

  // Update Values
  user.userData.stats = stats;

  // Firebase
  const updateUserStatsResponse = await UPDATE_USER_STATS(id, stats);
  if (updateUserStatsResponse !== null && "error" in updateUserStatsResponse)
    return updateUserStatsResponse;

  // Core
  USERS.update(id, user);

  sendCoreLog("End Set User Stats " + id);
  return user;
};

//======================================================================================================================
// Set User Status
//======================================================================================================================

export const setUserStatus = async (
  id: string,
  status: StatusType
): Promise<UserInterface | ErrorInterface> => {
  sendCoreLog("Set User Status " + id, { status: status });

  // Fetch User
  const user = await fetchUser(id);
  if ("error" in user) return user;

  // Update Values
  user.userData.status = status;

  // Firebase
  const updateUserStatusResponse = await UPDATE_USER_STATUS(id, status);
  if (updateUserStatusResponse !== null && "error" in updateUserStatusResponse)
    return updateUserStatusResponse;

  // Core
  USERS.update(id, user);

  sendCoreLog("End Set User Status " + id);
  return user;
};

//======================================================================================================================
// Set User Image
//======================================================================================================================

export const setUserImage = async (
  id: string,
  image: ImageInterface
): Promise<ErrorInterface | UserInterface> => {
  sendCoreLog("Set User Image " + id, { image: image });

  // Image Id
  let imageId = image?.id || null;

  // Fetch User
  const user = await fetchUser(id);
  if ("error" in user) return user;

  // Remove Image
  if (user.userData.imageId) await removeImage(user.userData.imageId);

  // Create Image
  if (image) {
    const newImage = await createImage(image.imageData, image.id);
    if ("error" in newImage) return newImage;
    imageId = image.id;
  }

  // Update Member ImageIds
  for (let i = 0; i < user.memberIds.length; i++)
    await setMemberImageId(user.memberIds[i], imageId);

  // Update Values
  user.userData.imageId = imageId;

  // Update User ImageId
  const updateUserImageIdResponse = await UPDATE_USER_IMAGE_ID(id, imageId);
  if (
    updateUserImageIdResponse !== null &&
    "error" in updateUserImageIdResponse
  )
    return updateUserImageIdResponse;

  // Core
  USERS.update(id, user);

  sendCoreLog("End Set User Image " + id);
  return user;
};

//======================================================================================================================
// Set User Description
//======================================================================================================================

export const setUserDescription = async (
  id: string,
  description: string
): Promise<UserInterface | ErrorInterface> => {
  sendCoreLog("Set User Description " + id, { description: description });

  // Fetch User
  const user = await fetchUser(id);
  if ("error" in user) return user;

  // Update Values
  user.userData.description = description;

  // Update User Description
  const updateUserDescriptionResponse = await UPDATE_USER_DESCRIPTION(
    id,
    description
  );
  if (
    updateUserDescriptionResponse !== null &&
    "error" in updateUserDescriptionResponse
  )
    return updateUserDescriptionResponse;

  // Core
  USERS.update(id, user);

  sendCoreLog("End Set User Description " + id);
  return user;
};

//======================================================================================================================
// Set User MemberIds
//======================================================================================================================

export const setUserMemberIds = async (
  id: string,
  memberId: string,
  add: boolean
) => {
  sendCoreLog("Set User MemberIds " + id, { memberId: memberId, add: add });

  // Fetch User
  const user = await fetchUser(id);
  if ("error" in user) return user;

  // Update MemberIds
  let newMemberIds = [...user.memberIds];
  if (add) newMemberIds.push(memberId);
  else newMemberIds = newMemberIds.filter((id) => id !== memberId);

  // Update Values
  user.memberIds = newMemberIds;

  // Update MemberIds Response
  const updateMemberIdsResponse = await UPDATE_USER_MEMBER_IDS(
    id,
    newMemberIds
  );
  if (updateMemberIdsResponse !== null && "error" in updateMemberIdsResponse)
    return updateMemberIdsResponse;

  // Core
  USERS.update(id, user);

  sendCoreLog("End Set User MemberIds " + id);
  return user;
};

//======================================================================================================================
// Remove User
//======================================================================================================================

export const removeUser = async (
  id: string
): Promise<ErrorInterface | null> => {
  sendCoreLog("Remove User " + id);

  // Fetch User
  const user = await fetchUser(id);
  if ("error" in user) return user;

  // Delete User from Firebase
  const deleteUserResponse = await deleteUser();
  if (deleteUserResponse !== null && "error" in deleteUserResponse)
    return deleteUserResponse;

  // Remove User Members
  for (let i = 0; i < user.memberIds.length; i++)
    await removeMember(user.memberIds[i]);

  // Remove Image
  if (user.userData.imageId) await removeImage(user.userData.imageId);

  // Remove User
  const removeUserResponse = await REMOVE_USER(id);
  if (removeUserResponse !== null && "error" in removeUserResponse)
    return removeUserResponse;

  sendCoreLog("End Remove User " + id);
  return null;
};

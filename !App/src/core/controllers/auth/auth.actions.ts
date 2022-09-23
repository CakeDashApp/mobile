import {
  SIGNOUT,
  RESET_PASSWORD,
  SIGNIN,
  SIGNUP,
  DELETE_USER,
} from "./auth.routes";
import { EMAIL, EXPIRATION_TIME, USER_ID, TOKEN } from "./auth.controller";

import { sendCoreLog } from "../../helper/general/logger.helper";
import { fetchImage } from "../image/image.actions";
import { MEMBERS } from "../member/member.controller";
import { fetchTeam } from "../team/team.actions";
import { fetchMember } from "../member/member.actions";
import { ErrorInterface } from "../error/error.interface";
import {
  createUser,
  fetchUser,
  removeUser,
  setUserStatus,
} from "../user/user.actions";
import { TeamInterface } from "../team/team.interface";
import { CAKES } from "../cake/cake.controller";
import { IMAGES } from "../image/image.controller";
import { PRODUCTS } from "../product/product.controller";
import { TEAMS } from "../team/team.controller";
import { USERS } from "../user/user.controller";
import { MemberInterface } from "../member/member.interface";
import { EVENTS } from "../event/event.controller";
import core from "../../index";

//======================================================================================================================
// Sign In
//======================================================================================================================

export const signIn = async (
  email: string,
  password: string
): Promise<ErrorInterface | null> => {
  sendCoreLog("Sign In");

  // Sign In
  const authData = await SIGNIN(email, password);
  if ("error" in authData) return authData;

  // Core
  USER_ID.set(authData.userId);
  TOKEN.set(authData.token);
  EXPIRATION_TIME.set(authData.expirationTime);
  EMAIL.set(email);

  // Fetch first Data
  const fetchResponse = await fetchFirstData(authData.userId);
  if (fetchResponse !== null && "error" in fetchResponse) return fetchResponse;

  sendCoreLog("End Sign In");
  return null;
};

//======================================================================================================================
// Try Sign In
//======================================================================================================================

export const trySignIn = async (): Promise<boolean> => {
  sendCoreLog("Try Sign In");

  // Success
  let success: boolean = false;

  // Fetch First Data
  if (USER_ID.exists) {
    const fetchResponse = await fetchFirstData(USER_ID.value);
    if (fetchResponse === null) success = true;
  }

  sendCoreLog("End Try Sign In | Success = " + success);
  return success;
};

//======================================================================================================================
// Sign Up
//======================================================================================================================

export const signUp = async (
  email: string,
  password: string,
  name: string
): Promise<ErrorInterface | null> => {
  sendCoreLog("Sign Up");

  // Sign Up
  const authData = await SIGNUP(email, password);
  if ("error" in authData) return authData;

  // Core
  USER_ID.set(authData.userId);
  TOKEN.set(authData.token);
  EXPIRATION_TIME.set(authData.expirationTime);
  EMAIL.set(email);

  // Create User
  const user = await createUser(name, authData.userId);
  if ("error" in user) {
    // Reset Data
    USER_ID.reset();
    TOKEN.reset();
    EXPIRATION_TIME.reset();
    EMAIL.reset();

    return {
      error: {
        message: "Failed to create User",
        type: "firebase",
        e: null,
      },
    };
  }

  sendCoreLog("End Sign Up");
  return null;
};

//======================================================================================================================
// Sign Out
//======================================================================================================================

export const signOut = async (): Promise<ErrorInterface | null> => {
  sendCoreLog("Sign Out");

  // Set Status to offline
  await setUserStatus(USER_ID.value, "offline");

  // Sing Out
  const signOutResponse = await SIGNOUT();
  if (signOutResponse !== null && "error" in signOutResponse)
    return signOutResponse;

  // Reset Core
  TEAMS.reset();
  CAKES.reset();
  EVENTS.reset();
  IMAGES.reset();
  MEMBERS.reset();
  PRODUCTS.reset();
  USERS.reset();
  USER_ID.reset();
  EXPIRATION_TIME.reset();
  TOKEN.reset();

  sendCoreLog("End Sign Out");
  return null;
};

//======================================================================================================================
// Remove User
//======================================================================================================================

export const deleteUser = async (): Promise<ErrorInterface | null> => {
  sendCoreLog("Delete User");

  // Delete User
  const deleteUserResponse = await DELETE_USER();
  if (deleteUserResponse !== null && "error" in deleteUserResponse)
    return deleteUserResponse;

  // Remove UserFrom Firebase Database
  const removeUserResponse = await removeUser(USER_ID.value);
  if (removeUserResponse !== null && "error" in removeUserResponse)
    return removeUserResponse;

  // Reset Core
  TEAMS.reset();
  CAKES.reset();
  EVENTS.reset();
  IMAGES.reset();
  MEMBERS.reset();
  PRODUCTS.reset();
  USERS.reset();
  USER_ID.reset();
  EXPIRATION_TIME.reset();
  EMAIL.reset();
  TOKEN.reset();

  sendCoreLog("End Delete User");
  return null;
};

//======================================================================================================================
// Reset Password
//======================================================================================================================

export const resetPassword = async (
  email: string
): Promise<ErrorInterface | null> => {
  sendCoreLog("Reset Password");

  // Reset Password
  const resetPasswordResponse = await RESET_PASSWORD(email);
  if (resetPasswordResponse !== null && "error" in resetPasswordResponse)
    return resetPasswordResponse;

  sendCoreLog("End Reset Password");
  return null;
};

//======================================================================================================================
// Is Auth
//======================================================================================================================

export const isAuth = (): boolean => {
  return USER_ID.value !== "" && TOKEN.value !== "";
};

//======================================================================================================================
//Fetch Data
//======================================================================================================================

export const fetchFirstData = async (
  userId: string
): Promise<ErrorInterface | null> => {
  sendCoreLog("Fetch First Data");

  // Correct selected userId of CURRENT_USER
  core.user.CURRENT_USER?.select(userId);

  // Fetch User
  const user = await fetchUser(userId);
  if ("error" in user) return user;

  // Fetch User Image
  if (user.userData.imageId) await fetchImage(user.userData.imageId);

  // Fetch User Members
  const members: MemberInterface[] = [];
  for (let i = 0; i < user.memberIds.length; i++) {
    const member = await fetchMember(user.memberIds[i]);

    if (!("error" in member)) members.push(member);
  }

  // Fetch User Teams
  const teams: TeamInterface[] = [];
  for (let i = 0; i < members.length; i++) {
    const team = await fetchTeam(members[i].teamId);
    if (!("error" in team)) teams.push(team);
  }

  sendCoreLog("End Fetch First Data");
  return null;
};

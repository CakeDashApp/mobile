import Firebase from "../../api/firebase/config.firebase";
import { sendFirebaseLog } from "../../helper/general/logger.helper";
import { ErrorInterface } from "../error/error.interface";

export const SIGNIN = async (
  email: string,
  password: string
): Promise<
  ErrorInterface | { userId: string; token: string; expirationTime: string }
> => {
  sendFirebaseLog("Sign In " + email);
  let user;

  // If the email is "" the !App will crash without any message
  if (email === "" || password === "")
    return {
      error: {
        type: "firebase",
        message: "Failed to SignIn",
        e: null,
      },
    };

  // Firebase Sign In
  try {
    const userCredential = await Firebase.auth().signInWithEmailAndPassword(
      email,
      password
    );
    user = userCredential.user;
  } catch (e) {
    return {
      error: {
        type: "firebase",
        message: e.message,
        e: e,
      },
    };
  }

  sendFirebaseLog("End Sign In");

  if (user) {
    // Get AuthData Values
    const userId = user.uid;
    const idTokenResult = await user.getIdTokenResult();
    const token = idTokenResult.token;
    const expirationTime = idTokenResult.expirationTime;

    // Create AuthData
    return {
      userId: userId,
      token: token,
      expirationTime: expirationTime,
    };
  } else
    return {
      error: {
        type: "firebase",
        message: "Failed to SignIn",
        e: null,
      },
    };
};

export const SIGNUP = async (
  email: string,
  password: string
): Promise<
  ErrorInterface | { userId: string; token: string; expirationTime: string }
> => {
  sendFirebaseLog("Sign Up " + email);
  let user;

  // If the email is "" the !App will crash without any message
  if (email === "" || password === "")
    return {
      error: {
        type: "firebase",
        message: "Failed to SignIn",
        e: null,
      },
    };

  // Firebase Sign Up
  try {
    const userCredential = await Firebase.auth().createUserWithEmailAndPassword(
      email,
      password
    );
    user = userCredential.user;
  } catch (e) {
    return {
      error: {
        type: "firebase",
        message: e.message,
        e: e,
      },
    };
  }

  sendFirebaseLog("End Sign Up");

  if (user) {
    // Get AuthData Values
    const userId = user.uid;
    const idTokenResult = await user.getIdTokenResult();
    const token = idTokenResult.token;
    const expirationTime = idTokenResult.expirationTime;

    // Create AuthData
    return {
      userId: userId,
      token: token,
      expirationTime: expirationTime,
    };
  } else
    return {
      error: {
        type: "firebase",
        message: "Failed to SignUp",
        e: null,
      },
    };
};

export const SIGNOUT = async (): Promise<ErrorInterface | null> => {
  sendFirebaseLog("Sign Out");
  try {
    await Firebase.auth().signOut();
  } catch (e) {
    return {
      error: {
        type: "firebase",
        message: e.message,
        e: e,
      },
    };
  }

  sendFirebaseLog("End Sign Out");

  return null;
};

export const RESET_PASSWORD = async (
  email: string
): Promise<ErrorInterface | null> => {
  sendFirebaseLog("Reset Password");
  try {
    await Firebase.auth().sendPasswordResetEmail(email);
  } catch (e) {
    return {
      error: {
        type: "firebase",
        message: e.message,
        e: e,
      },
    };
  }

  sendFirebaseLog("End Reset Password");

  return null;
};

export const DELETE_USER = async (): Promise<ErrorInterface | null> => {
  sendFirebaseLog("Delete User");
  try {
    const user = Firebase.auth().currentUser;
    await user?.delete();
  } catch (e) {
    return {
      error: {
        type: "firebase",
        message: e.message,
        e: e,
      },
    };
  }

  sendFirebaseLog("End Delete User");

  return null;
};

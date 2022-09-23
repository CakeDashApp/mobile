import { HAS_INTERNET_CONNECTION, LANGUAGE } from "./other.controller";
import { sendCoreLog } from "../../helper/general/logger.helper";

//======================================================================================================================
// Set Language
//======================================================================================================================

export const setLanguage = (language: "en" | "de") => {
  sendCoreLog("Set Language " + language);

  if (language !== LANGUAGE.value) LANGUAGE.set(language);

  sendCoreLog("End Set Language");
};

//======================================================================================================================
// Set Has Internet Connection
//======================================================================================================================

export const setHasInternetConnection = (internetConnection: boolean) => {
  sendCoreLog("Set Has Internet Connection " + internetConnection);

  if (internetConnection !== HAS_INTERNET_CONNECTION.value)
    HAS_INTERNET_CONNECTION.set(internetConnection);

  sendCoreLog("End Has Internet Connection");
};

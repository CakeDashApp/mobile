import lightTheme from "./themes/ui.light";
import darkTheme from "./themes/ui.dark";
import {
  HEADER_HEIGHT,
  KEYBOARD_HEIGHT,
  KEYBOARD_IS_VISIBLE,
  SHOW_TABBAR,
  THEME,
  THEME_TYPE,
} from "./ui.controller";

import { sendCoreLog } from "../../helper/general/logger.helper";

//======================================================================================================================
// Set Theme
//======================================================================================================================

export const setTheme = (theme: "light" | "dark" | "default") => {
  sendCoreLog("Set Theme " + theme);

  switch (theme) {
    case "light":
      THEME.set(lightTheme);
      THEME_TYPE.set(theme);
      break;
    case "dark":
      THEME.set(darkTheme);
      THEME_TYPE.set(theme);
      break;
    case "default":
      THEME.reset();
      THEME_TYPE.reset();
      break;
    default:
    // Shouldn't happen
  }

  sendCoreLog("End Set Theme");
};

//======================================================================================================================
// Set Keyboard Is Visible
//======================================================================================================================

export const setKeyboardIsVisible = (visible: boolean) => {
  sendCoreLog("Set Keyboard Is Visible");

  if (KEYBOARD_IS_VISIBLE.value !== visible) KEYBOARD_IS_VISIBLE.set(visible);

  sendCoreLog("End Set Keyboard Is Visible");
};

//======================================================================================================================
// Set Keyboard Height
//======================================================================================================================

export const setKeyboardHeight = (height: number) => {
  sendCoreLog("Set Keyboard Height " + height);

  if (KEYBOARD_HEIGHT.value !== height) KEYBOARD_HEIGHT.set(height);

  sendCoreLog("End Set Keyboard Height " + height);
};

//======================================================================================================================
// Set Tabbar
//======================================================================================================================

export const setTabbar = (show: boolean) => {
  sendCoreLog("Update Tabbar " + show);

  SHOW_TABBAR.set(show);

  sendCoreLog("End Update Tabbar");
};

//======================================================================================================================
// Set Header Height
//======================================================================================================================

export const setHeaderHeight = (height: number) => {
  sendCoreLog("Update Header Height " + height);

  HEADER_HEIGHT.set(height);

  sendCoreLog("End Update Header Height");
};

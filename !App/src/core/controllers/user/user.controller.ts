import { App } from "../../agile";
import { UserInterface } from "./user.interface";

export const USERS = App.Collection<UserInterface>((collection) => {
  return {
    selectors: {
      mainUser: collection.createSelector("mainUser", "notLoaded"), // Correct ItemKey will be set in 'fetchFirstData'
    },
  };
});

export const CURRENT_USER = USERS.getSelector("mainUser");

import { App } from "../../agile";
import { TeamInterface } from "./team.interface";
import { USER_ID } from "../auth/auth.controller";

export const TEAMS = App.Collection<TeamInterface>();

export const USER_TEAMS = App.Computed<TeamInterface[]>(() => {
  return TEAMS.getGroup(USER_ID.value).output;
}, [TEAMS.getGroup(TEAMS.config.defaultGroupKey || 'default')]);

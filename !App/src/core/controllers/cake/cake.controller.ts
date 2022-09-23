import { App } from "../../agile";
import { CakeInterface } from "./cake.interface";
import { USER_ID } from "../auth/auth.controller";

export const randomCakeKey = "random-cake";

export const CAKES = App.Collection<CakeInterface>();

export const USER_CAKES = App.Computed<CakeInterface[]>(() => {
  return CAKES.getGroup(USER_ID.value).output;
}, []);

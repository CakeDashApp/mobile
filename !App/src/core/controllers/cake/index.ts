import * as actions from "./cake.actions";
import * as controller from "./cake.controller";
import * as routes from "./cake.routes";
import * as interfaces from "./cake.interface";

export default {
  ...actions,
  ...controller,
  ...routes,
  ...interfaces,
};

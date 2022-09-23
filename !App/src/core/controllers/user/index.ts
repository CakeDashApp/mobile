import * as controller from "./user.controller";
import * as actions from "./user.actions";
import * as routes from "./user.routes";
import * as interfaces from "./user.interface";

export default {
  ...controller,
  ...actions,
  ...routes,
  ...interfaces,
};

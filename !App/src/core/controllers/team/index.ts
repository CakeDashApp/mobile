import * as controller from "./team.controller";
import * as actions from "./team.actions";
import * as routes from "./team.routes";
import * as interfaces from "./team.interface";

export default {
  ...controller,
  ...actions,
  ...routes,
  ...interfaces,
};

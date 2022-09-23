import * as routes from "./auth.routes";
import * as actions from "./auth.actions";
import * as controller from "./auth.controller";

export default {
  ...routes,
  ...actions,
  ...controller,
};

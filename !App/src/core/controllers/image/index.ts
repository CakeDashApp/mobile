import * as actions from "./image.actions";
import * as controller from "./image.controller";
import * as routes from "./image.routes";
import * as interfaces from "./image.interface";

export default {
  ...actions,
  ...controller,
  ...routes,
  ...interfaces,
};

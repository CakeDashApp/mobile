import * as controller from "./member.controller";
import * as actions from "./member.actions";
import * as routes from "./member.routes";
import * as interfaces from "./member.interface";

export default {
  ...controller,
  ...actions,
  ...routes,
  ...interfaces,
};

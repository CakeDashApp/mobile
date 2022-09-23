import * as actions from "./event.actions";
import * as controller from "./event.controller";
import * as routes from "./event.routes";
import * as manager from "./event.manager";
import * as interfaces from "./event.interface";
import * as types from "./types";

export default {
  ...actions,
  ...controller,
  ...routes,
  ...manager,
  ...interfaces,
  ...types,
};

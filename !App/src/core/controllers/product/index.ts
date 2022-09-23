import * as controller from "./product.controller";
import * as actions from "./product.actions";
import * as routes from "./product.routes";
import * as interfaces from "./product.interface";

export default {
  ...controller,
  ...actions,
  ...routes,
  ...interfaces,
};

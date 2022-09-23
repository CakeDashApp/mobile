import event from "./controllers/event";
import cake from "./controllers/cake";
import user from "./controllers/user";
import product from "./controllers/product";
import team from "./controllers/team";
import image from "./controllers/image";
import member from "./controllers/member";
import other from "./controllers/other";
import ui from "./controllers/ui";
import auth from "./controllers/auth";
import error from "./controllers/error";
import helper from "./helper";
import {globalBind} from "@agile-ts/core";

const core = {
  cake: cake,
  event: event,
  user: user,
  team: team,
  product: product,
  image: image,
  member: member,
  error: error,
  other: other,
  ui: ui,
  auth: auth,
  helper: helper,
};

globalBind("__core__", core);

export default core;

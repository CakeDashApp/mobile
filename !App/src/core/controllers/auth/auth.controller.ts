import { App } from "../../agile";

export const USER_ID = App.State<string>("").persist("user-id");
export const EXPIRATION_TIME = App.State<string>("").persist("expiration-time");
export const TOKEN = App.State<string>("").persist("token");
export const EMAIL = App.State<string>("").persist("email");

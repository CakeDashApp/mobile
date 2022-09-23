import { App } from "../../agile";

export const VERSION_CODE = App.State<string>("0.0.2");
export const LANGUAGE = App.State<"en" | "de">("en").persist("language");
export const HAS_INTERNET_CONNECTION = App.State<boolean>(true);

import { App } from "../../agile";
import lightTheme from "./themes/ui.light";
import { ThemeInterface } from "./interfaces";

export const THEME = App.State<ThemeInterface>(lightTheme);
export const THEME_TYPE = App.State<"dark" | "light">("light").persist(
  "theme-type"
);
export const KEYBOARD_IS_VISIBLE = App.State<boolean>(false);
export const KEYBOARD_HEIGHT = App.State<number>(0);
export const SHOW_TABBAR = App.State<boolean>(false);
export const HEADER_HEIGHT = App.State<number>(50);

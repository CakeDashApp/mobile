import { ThemeInterface } from "../interfaces";

const colors = {
  // Primary
  primary: "#05376A",
  primary_2: "#0963A2",
  on_primary: "#ffffff",
  on_primary_2: "#d8d8d8",
  on_primary_3: "#a8a8a8",

  // Secondary
  secondary: "#5DB8FE",
  secondary_2: "#39cff2",
  on_secondary: "#ffffff",

  // Background
  background: "#eeeeee",
  on_background: "#000000",
  on_background_2: "#aeadad",

  // Surface
  surface: "#ffffff",
  on_surface: "#000000",
  on_surface_2: "#767676",
  on_surface_3: "#bfbfbf",

  // Error
  error: "#b00020",
  on_error: "#ffffff",

  // Success
  success: "#2ae750",
  on_success: "#ffffff"
};

const sizes = {
  // font sizes
  font: 12,
  h1: 40,
  h2: 25,
  h3: 20,
  body: 12,
  small: 10
};

const fonts = {
  thin: "Roboto-Thin",
  thin_italic: "Roboto-ThinItalic",
  light: "Roboto-Light",
  light_italic: "Roboto-LightItalic",
  regular: "Roboto-Black",
  regular_italic: "Roboto-BlackItalic",
  medium: "Roboto-Medium",
  medium_italic: "Roboto-MediumItalic",
  bold: "Roboto-Bold",
  bold_italic: "Robot-BoldItalic"
};

const shadow = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2
  },
  shadowOpacity: 0.23,
  shadowRadius: 2.62,

  elevation: 4
};

const theme: ThemeInterface = {
  type: "light",
  colors: colors,
  sizes: sizes,
  fonts: fonts,
  shadow: shadow
};
export default theme;

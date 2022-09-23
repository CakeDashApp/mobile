import { ThemeInterface } from "../interfaces";

const colors = {
  // Primary
  primary: "#021B33",
  primary_2: "#063556",
  on_primary: "#ffffff",
  on_primary_2: "#d8d8d8",
  on_primary_3: "#a8a8a8",

  // Secondary
  secondary: "#356E9A",
  secondary_2: "#146376",
  on_secondary: "#ffffff",

  // Background
  background: "#1C1C1E",
  on_background: "#ffffff",
  on_background_2: "#ccc",

  // Surface
  surface: "#45484a",
  on_surface: "#ffffff",
  on_surface_2: "#d8d8d8",
  on_surface_3: "#9f9f9f",

  // Error
  error: "#ba2323",
  on_error: "#ffffff",

  // Success
  success: "#2f8553",
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
  type: "dark",
  colors: colors,
  sizes: sizes,
  fonts: fonts,
  shadow: shadow
};
export default theme;

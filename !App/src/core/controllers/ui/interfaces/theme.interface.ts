interface ColorsInterface {
  // Primary
  primary: string;
  primary_2: string;
  on_primary: string;
  on_primary_2: string;
  on_primary_3: string;

  // Secondary
  secondary: string;
  secondary_2: string;
  on_secondary: string;

  // Background
  background: string;
  on_background: string;
  on_background_2: string;

  // Surface
  surface: string;
  on_surface: string;
  on_surface_2: string;
  on_surface_3: string;

  // Error
  error: string;
  on_error: string;

  // Success
  success: string;
  on_success: string;
}

interface SizesInterface {
  // font sizes
  font: number;
  h1: number;
  h2: number;
  h3: number;
  body: number;
  small: number;
}

interface FontsInterface {
  thin: string;
  thin_italic: string;
  light: string;
  light_italic: string;
  regular: string;
  regular_italic: string;
  medium: string;
  medium_italic: string;
  bold: string;
  bold_italic: string;
}

interface ShadowInterface {
  shadowColor: string;
  shadowOffset: {
    width: number;
    height: number;
  };
  shadowOpacity: number;
  shadowRadius: number;

  elevation: number;
}

export interface ThemeInterface {
  type: string;
  colors: ColorsInterface;
  sizes: SizesInterface;
  fonts: FontsInterface;
  shadow: ShadowInterface;
}

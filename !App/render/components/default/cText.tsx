import React, {useContext} from "react";
import { Text } from "react-native";
import ThemeContext from "../../../context/ThemeContext";

interface Props {
  // Size
  size?: number;

  // Type
  thin?: boolean;
  thin_italic?: boolean;
  light?: boolean;
  light_italic?: boolean;
  regular?: boolean;
  regular_italic?: boolean;
  medium?: boolean;
  medium_italic?: boolean;
  bold?: boolean;
  bold_italic?: boolean;

  // Position
  center?: boolean;
  right?: boolean;
  left?: boolean;

  // Color
  color?: string;

  // Other
  numberOfLines?: number;

  // Style
  style?: object;
}

const CText: React.FC<Props> = (props) => {
  // Props
  const {
    size,
    thin,
    thin_italic,
    light,
    light_italic,
    regular,
    regular_italic,
    medium,
    medium_italic,
    bold,
    bold_italic,
    center,
    right,
    left,
    color,
    numberOfLines,
    style,
  } = props;

  // Theme
  const theme = useContext(ThemeContext);

  //======================================================================================================================
  //Text Style
  //======================================================================================================================

  const textStyles: (object | undefined)[] = [
    //Size
    (size && { fontSize: size }) || undefined,

    //Type
    (thin && { fontFamily: theme.fonts.thin }) || undefined,
    (thin_italic && { fontFamily: theme.fonts.thin_italic }) || undefined,
    (light && { fontFamily: theme.fonts.light }) || undefined,
    (light_italic && { fontFamily: theme.fonts.light_italic }) || undefined,
    (regular && { fontFamily: theme.fonts.regular }) || undefined,
    (regular_italic && { fontFamily: theme.fonts.regular_italic }) || undefined,
    (medium && { fontFamily: theme.fonts.medium }) || undefined,
    (medium_italic && { fontFamily: theme.fonts.medium_italic }) || undefined,
    (bold && { fontFamily: theme.fonts.bold }) || undefined,
    (bold_italic && { fontFamily: theme.fonts.bold_italic }) || undefined,

    //Position
    (center && { textAlign: "center" }) || undefined,
    (right && { textAlign: "right" }) || undefined,
    (left && { textAlign: "left" }) || undefined,

    //Colors
    color ? { color: color } : { color: "black" },

    // Style
    style,
  ].filter((style) => style !== undefined);

  //======================================================================================================================
  //Render
  //======================================================================================================================

  return (
    <Text style={textStyles} numberOfLines={numberOfLines}>
      {props.children}
    </Text>
  );
};

export default CText;

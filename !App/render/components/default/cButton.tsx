import React from "react";
import LinearGradient from "react-native-linear-gradient";
import CBlock from "./cBlock";
import { Animation } from "react-native-animatable";
import * as Animatable from "react-native-animatable";
import { ViewProps, ViewStyle } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface Props {
  //General
  hide?: boolean;
  disabled?: boolean;
  disabledColor?: string | string[];

  //Position
  padding?: number;
  margin?: number;
  row?: boolean;

  //Gradient
  end?: { x: number; y: number };
  start?: { x: number; y: number };
  locations?: number[];

  //Design
  round?: boolean;
  radius?: number;
  color?: string | string[];
  opacity?: number;
  shadow?: boolean;

  //Border
  border?: boolean;
  borderColor?: string;
  borderWidth?: number;
  borderDisabledColor?: string;

  //Size
  height?: number | string;
  width?: number | string;

  //Animation
  animation?: Animation;
  animationRef?: (
    ref: React.ClassicComponent<
      Animatable.AnimatableProperties<ViewStyle> & ViewProps,
      any
    > | null
  ) => void;

  // On Press
  onPress: () => void;

  //Style
  style?: object;
}

const CButton: React.FC<Props> = (props) => {
  // Props
  const {
    hide,
    disabled,
    disabledColor,
    padding,
    margin,
    row,
    end,
    start,
    locations,
    round,
    radius,
    opacity,
    shadow,
    border,
    borderDisabledColor,
    height,
    width,
    animation,
    onPress,
    style,
    children,
    animationRef,
  } = props;

  //Calculate Colors
  const calculateColor = (): string => {
    if (!disabled) {
      if (props.color)
        return typeof props.color === "string" ? props.color : props.color[0];
      return "";
    } else {
      if (disabledColor)
        return typeof disabledColor === "string"
          ? disabledColor
          : disabledColor[0];
      return "";
    }
  };
  const calculateColors = (): string[] => {
    if (!color) return [];

    if (!disabled) {
      if (props.color)
        return typeof props.color === "string"
          ? [props.color, props.color]
          : props.color;
      return ["red", "green"];
    } else {
      if (disabledColor)
        return typeof disabledColor === "string"
          ? [disabledColor, disabledColor]
          : disabledColor;
      else return ["#6b6a6a", "#d0d0d0"];
    }
  };
  const calculateBorderColor = (): string => {
    if (!disabled) return props.borderColor || "green";
    else return props.borderDisabledColor || "#6b6a6a";
  };

  // Colors
  const color: string | undefined = calculateColor();
  const colors: string[] = calculateColors();
  const borderColor = calculateBorderColor();

  // Border
  const borderWidth = props.borderWidth ? props.borderWidth : 1;

  //======================================================================================================================
  // Button Styles
  //======================================================================================================================

  const buttonStyles: (object | undefined)[] = [
    // Default
    {
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
      alignSelf: "flex-start",

      borderRadius: 5,
    },

    // Other
    (row && { flexDirection: "row" }) || undefined,
    (padding && { padding: padding }) || undefined,
    (border && { borderWidth: borderWidth, borderColor: borderColor }) ||
      undefined,
    (color && { backgroundColor: color }) || undefined,
    (round && { borderRadius: 50 }) || undefined,
    (opacity && { opacity: opacity }) || undefined,
    (radius && { borderRadius: radius }) || undefined,
    (shadow && {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,

      elevation: 4,
    }) ||
      undefined,
    (width && { width: "100%" }) || undefined,
    (height && { height: "100%" }) || undefined,

    // Style
    style,
  ].filter((style) => style !== undefined);

  const buttonContainerStyle: any[] = [
    width && { width: width },
    height && { height: height },
    margin && { margin: margin },
  ].filter((style) => style !== undefined);

  //======================================================================================================================
  // Render Gradient Button
  //======================================================================================================================

  const GradientButton = () => {
    return (
      <CBlock
        flex={false}
        animation={animation}
        animationRef={animationRef}
        style={buttonContainerStyle}
      >
        <TouchableOpacity
          style={{ padding: 5 }}
          disabled={disabled}
          onPress={onPress}
        >
          <LinearGradient
            style={buttonStyles}
            colors={colors || []}
            locations={locations}
            start={start}
            end={end}
          >
            {children}
          </LinearGradient>
        </TouchableOpacity>
      </CBlock>
    );
  };

  //======================================================================================================================
  // Render Normal Button
  //======================================================================================================================

  const NormalButton = () => {
    return (
      <CBlock
        flex={false}
        animation={animation}
        animationRef={animationRef}
        style={buttonContainerStyle}
      >
        <TouchableOpacity
          style={{ padding: 5 }}
          disabled={props.disabled}
          onPress={onPress}
        >
          <CBlock flex={false} style={buttonStyles}>
            {children}
          </CBlock>
        </TouchableOpacity>
      </CBlock>
    );
  };

  //======================================================================================================================
  // Render Button
  //======================================================================================================================

  const Button = () => {
    if (colors.length > 0) {
      return <GradientButton />;
    } else {
      return <NormalButton />;
    }
  };

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return !hide ? <Button /> : null;
};

export default CButton;

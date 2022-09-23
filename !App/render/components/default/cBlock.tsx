import React from "react";
import { View, ViewProps, ViewStyle } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Animation } from "react-native-animatable";
import * as Animatable from "react-native-animatable";

interface Props {
  //General
  visible?: boolean;
  key?: any;

  // Flex
  flex?: number | boolean;

  // Order
  row?: boolean;
  column?: boolean;

  // Pos
  center?: boolean;
  middle?: boolean;
  left?: boolean;
  right?: boolean;
  top?: boolean;
  bottom?: boolean;
  space?: string;

  // Margin
  margin?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  marginHorizontal?: number;
  marginVertical?: number;

  // Padding
  padding?: number;

  // Design
  card?: boolean;
  shadow?: boolean;
  color?: string | string[];
  opacity?: number;

  // Gradient
  end?: { x: number; y: number };
  start?: { x: number; y: number };
  locations?: number[];

  // Size
  width?: number | string;
  height?: number | string;

  // Animation
  animation?: Animation;
  animationRef?: (
    ref: React.ClassicComponent<
      Animatable.AnimatableProperties<ViewStyle> & ViewProps,
      any
    > | null
  ) => void;
  iterationCount?: "infinite" | number;

  // Style
  style?: object;
}

const CBlock: React.FC<Props> = (props) => {
  // Props
  const {
    key,
    flex,
    row,
    column,
    center,
    middle,
    top,
    bottom,
    left,
    right,
    space,
    margin,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    marginHorizontal,
    marginVertical,
    padding,
    card,
    shadow,
    color,
    opacity,
    end,
    start,
    locations,
    width,
    height,
    animation,
    animationRef,
    iterationCount,
    style,
    children,
  } = props;
  const visible = props.visible !== undefined ? props.visible : true;

  //======================================================================================================================
  // Block Styles
  //======================================================================================================================

  const blockStyles: (object | undefined)[] = [
    // Default
    { flex: 1 },

    // All
    (row && { flexDirection: "row" }) || undefined,
    (column && { flexDirection: "column" }) || undefined,
    (center && { alignItems: "center" }) || undefined,
    (middle && { justifyContent: "center" }) || undefined,
    (left && { alignItems: "flex-start" }) || undefined,
    (top && { justifyContent: "flex-start" }) || undefined,
    (bottom && { justifyContent: "flex-end" }) || undefined,
    (right && { alignItems: "flex-end" }) || undefined,
    (space && { justifyContent: `space-${space}` }) || undefined,
    (flex && typeof flex === "number" && { flex: flex }) || undefined,
    (flex === false && { flex: 0 }) || undefined, // reset / disable flex
    (card && {
      borderRadius: 10,
      overflow: "hidden",
    }) ||
      undefined,
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
    (color && typeof color === "string" && { backgroundColor: color }) ||
      undefined,
    (opacity && { opacity: opacity }) || undefined,
    (width && { width: width }) || undefined,
    (height && { height: height }) || undefined,
    (margin && { margin: margin }) || undefined,
    (marginTop && { marginTop: marginTop }) || undefined,
    (marginBottom && { marginBottom: marginBottom }) || undefined,
    (marginLeft && { marginLeft: marginLeft }) || undefined,
    (marginRight && { marginRight: marginRight }) || undefined,
    (marginVertical && { marginVertical: marginVertical }) || undefined,
    (marginHorizontal && { marginHorizontal: marginHorizontal }) || undefined,
    (padding && { padding: padding }) || undefined,

    //Custom Styling
    style,
  ].filter((style) => style !== undefined);

  //======================================================================================================================
  // Render Gradient Block
  //======================================================================================================================

  const GradientBlock = () => {
    return (
      <LinearGradient
        colors={(typeof color !== "string" && color) || []}
        locations={locations}
        start={start}
        end={end}
        style={blockStyles}
        key={key}
      >
        {children}
      </LinearGradient>
    );
  };

  //======================================================================================================================
  //Render Animated Gradient Block
  //======================================================================================================================

  const AnimatedGradientBlock = () => {
    return (
      <Animatable.View
        key={key}
        animation={animation}
        ref={animationRef}
        iterationCount={iterationCount}
      >
        <LinearGradient
          colors={(typeof color !== "string" && color) || []}
          locations={locations}
          start={start}
          end={end}
          style={blockStyles}
        >
          {children}
        </LinearGradient>
      </Animatable.View>
    );
  };

  //======================================================================================================================
  // Render Animated Block
  //======================================================================================================================

  const AnimatedBlock = () => {
    return (
      <Animatable.View
        key={key}
        style={blockStyles}
        animation={animation}
        ref={animationRef}
        iterationCount={iterationCount}
      >
        {children}
      </Animatable.View>
    );
  };

  //======================================================================================================================
  // Render Normal Block
  //======================================================================================================================

  const NormalBlock = () => {
    return (
      <View style={blockStyles} key={key}>
        {children}
      </View>
    );
  };

  //======================================================================================================================
  // Render Block
  //======================================================================================================================

  const Block = () => {
    if (color && typeof color !== "string" && (animation || animationRef)) {
      return <AnimatedGradientBlock />;
    } else if (color && typeof color !== "string") {
      return <GradientBlock />;
    } else if (animation || animationRef) {
      return <AnimatedBlock />;
    } else {
      return <NormalBlock />;
    }
  };

  //======================================================================================================================
  //Render
  //======================================================================================================================

  return visible ? Block() : null;
};

export default CBlock;

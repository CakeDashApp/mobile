import React from "react";
import {
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler"; // Why from gesture-handler?.. because in absolute views the touchable imported from react-native doesn't work
import {
  View,
  Platform,
  TouchableWithoutFeedbackProps,
  TouchableOpacityProps,
  TouchableNativeFeedbackProps,
  TouchableHighlightProps,
} from "react-native";

interface Props {
  // Touchable
  nativeFeedback?: boolean | TouchableNativeFeedbackProps;
  opacity?: boolean | TouchableOpacityProps;
  highlight?: boolean | TouchableHighlightProps;
  withoutFeedback?: boolean | TouchableWithoutFeedbackProps;

  // Touchable Props
  onPress: () => void;
  disabled?: boolean;

  // Style
  style?: object;
}

// TODO doesn't work at some point on android.. idk
const CTouchable: React.FC<Props> = (props) => {
  // Props
  const {
    onPress,
    style,
    opacity,
    highlight,
    withoutFeedback,
    disabled,
    children,
    nativeFeedback,
  } = props;

  //======================================================================================================================
  // Render Native Feedback
  //======================================================================================================================

  const NativeFeedback = () => {
    return (
      <TouchableNativeFeedback
        onPress={onPress}
        disabled={disabled}
        {...nativeFeedback}
      >
        <View style={[{ overflow: "hidden" }, style]}>{children}</View>
      </TouchableNativeFeedback>
    );
  };

  //======================================================================================================================
  // Render Without Feedback
  //======================================================================================================================

  const WithoutFeedBack = () => {
    return (
      <TouchableWithoutFeedback
        onPress={onPress}
        disabled={disabled}
        {...withoutFeedback}
      >
        <View style={[{ overflow: "hidden" }, style]}>{children}</View>
      </TouchableWithoutFeedback>
    );
  };

  //======================================================================================================================
  // Render Opacity
  //======================================================================================================================

  const Opacity = () => {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={[{ overflow: "hidden" }, style]}
        {...opacity}
      >
        {children}
      </TouchableOpacity>
    );
  };

  //======================================================================================================================
  // Render Highlight
  //======================================================================================================================

  const Highlight = () => {
    return (
      <TouchableHighlight onPress={onPress} disabled={disabled} {...highlight}>
        <View style={[{ overflow: "hidden" }, style]}>{children}</View>
      </TouchableHighlight>
    );
  };

  //======================================================================================================================
  // Render Touchable
  //======================================================================================================================

  const Touchable = () => {
    if (highlight) {
      return <Highlight />;
    } else if (opacity) {
      return <Opacity />;
    } else if (withoutFeedback) {
      return <WithoutFeedBack />;
    } else if (nativeFeedback) {
      return <NativeFeedback />;
    } else {
      return Platform.OS === "android" ? <Opacity /> : <Opacity />;
    }
  };

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return <Touchable />;
};

export default CTouchable;

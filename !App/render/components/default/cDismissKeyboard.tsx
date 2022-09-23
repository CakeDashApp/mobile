import React from "react";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";

interface Props {}

const CDismissKeyboard: React.FC<Props> = (props) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1 }}>{props.children}</View>
    </TouchableWithoutFeedback>
  );
};

export default CDismissKeyboard;

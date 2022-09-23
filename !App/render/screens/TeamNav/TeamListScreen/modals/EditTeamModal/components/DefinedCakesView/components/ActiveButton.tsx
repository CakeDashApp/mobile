import React from "react";
import CTabButton from "../../../../../../../../components/project/cTabButton";
import { View } from "react-native";
import strings from "../strings";

interface Props {
  selected: boolean;
  onPress: () => void;
}

const ActiveButton: React.FC<Props> = (props) => {
  // Props
  const { selected, onPress } = props;

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    // Note: without the wrapped view with the flexDirection Row.. the animation of the TabButton looks kind of wired..
    <View style={{ flexDirection: "row" }}>
      <CTabButton
        label={strings().activeButtonText}
        selected={selected}
        onPress={onPress}
        fontSize={15}
      />
    </View>
  );
};

export default ActiveButton;

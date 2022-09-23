import React from "react";
import CTabButton from "../../../../../../../../components/project/cTabButton";
import { View } from "react-native";
import strings from "../strings";

interface Props {
  selected: boolean;
  onPress: () => void;
}

const HiddenDasherButton: React.FC<Props> = (props) => {
  // Props
  const { selected, onPress } = props;

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    // Note: without the wrapped view with the flexDirection Row.. the animation of the TabButton looks kind of wired..
    <View style={{ flexDirection: "row" }}>
      <CTabButton
        label={strings().hiddenDasherButton}
        selected={selected}
        onPress={onPress}
        fontSize={15}
      />
    </View>
  );
};

export default HiddenDasherButton;

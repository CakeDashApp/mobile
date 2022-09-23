import React, { useCallback, useEffect } from "react";
import { AppState, Text, View } from "react-native";
import core from "../../../../src/core";
import { instantiateStatus } from "../../../../src/core/api/firebase";

interface props {}

const HomeScreen: React.FC<props> = (props) => {
  //======================================================================================================================
  // Handle Status
  //======================================================================================================================

  useEffect(() => {
    // Instantiate Status
    instantiateStatus();
  }, []);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <View>
      <Text>Home Screen</Text>
    </View>
  );
};

export default HomeScreen;

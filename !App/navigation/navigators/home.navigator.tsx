import HomeScreen from "../../render/screens/HomeNav/HomeScreen";
import React from "react";
import { defaultNavOptions, StackNav } from "../index";

//======================================================================================================================
//Home Navigator
//======================================================================================================================

export const HomeNavigator = () => {
  return (
    <StackNav.Navigator
      initialRouteName={"Home"}
      screenOptions={defaultNavOptions}
    >
      <StackNav.Screen name={"Home"} component={HomeScreen} />
    </StackNav.Navigator>
  );
};

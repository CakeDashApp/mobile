import ProfileScreen from "../../render/screens/ProfileNav/ProfileScreen";
import React from "react";
import { defaultNavOptions, StackNav } from "../index";

//======================================================================================================================
//Profile Navigator
//======================================================================================================================

export const ProfileNavigator = () => {
  return (
    <StackNav.Navigator
      initialRouteName={"Profile"}
      screenOptions={defaultNavOptions}
      mode={"modal"}
    >
      <StackNav.Screen name={"Profile"} component={ProfileScreen} />
    </StackNav.Navigator>
  );
};

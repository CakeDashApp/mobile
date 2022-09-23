import TeamListScreen from "../../render/screens/TeamNav/TeamListScreen";
import TeamScreen from "../../render/screens/TeamNav/TeamScreen";
import MemberScreen from "../../render/screens/TeamNav/MemberScreen";
import React from "react";
import { defaultNavOptions, StackNav } from "../index";

//======================================================================================================================
// Team Navigator
//======================================================================================================================

export const TeamNavigator = () => {
  return (
    <StackNav.Navigator
      initialRouteName={"TeamList"}
      screenOptions={defaultNavOptions}
      headerMode={"screen"}
    >
      <StackNav.Screen name={"TeamList"} component={TeamListScreen} />

      <StackNav.Screen name={"Team"} component={TeamScreen} />

      <StackNav.Screen name={"Member"} component={MemberScreen} />
    </StackNav.Navigator>
  );
};

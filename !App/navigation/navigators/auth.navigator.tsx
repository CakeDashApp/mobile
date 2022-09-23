import StartScreen from "../../render/screens/AuthNav/StartScreen";
import AuthScreen from "../../render/screens/AuthNav/AuthScreen";
import React from "react";
import { defaultNavOptions, StackNav } from "../index";

//======================================================================================================================
//Auth Navigator
//======================================================================================================================

export const AuthNavigator = () => {
  return (
    <StackNav.Navigator
      initialRouteName={"Splash"}
      screenOptions={defaultNavOptions}
      headerMode={"screen"}
    >
      <StackNav.Screen name={"Start"} component={StartScreen} />

      <StackNav.Screen name={"Auth"} component={AuthScreen} />
    </StackNav.Navigator>
  );
};

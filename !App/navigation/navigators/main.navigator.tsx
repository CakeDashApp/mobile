import LoadingScreen from "../../render/screens/StartScreens/LoadingScreen";
import SplashScreen from "../../render/screens/StartScreens/SplashScreen";
import React from "react";
import { defaultNavOptions, StackNav } from "../index";
import { AuthNavigator } from "./auth.navigator";
import { BottomTabNavigator } from "./bottomtab.navigator";

//======================================================================================================================
//Main Navigator
//======================================================================================================================

export const MainNavigator = () => {
  return (
    <StackNav.Navigator
      screenOptions={defaultNavOptions}
      initialRouteName={"Splash"}
    >
      <StackNav.Screen name={"Splash"} component={SplashScreen} />

      <StackNav.Screen name={"Loading"} component={LoadingScreen} />

      <StackNav.Screen name={"Auth"} component={AuthNavigator} />

      <StackNav.Screen name="Tabs" component={BottomTabNavigator} />
    </StackNav.Navigator>
  );
};

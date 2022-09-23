import { getActiveRouteName } from "../navigation.helper";
import core from "../../src/core";
import React from "react";
import { tabbarHiddenScreens, TabNav } from "../index";
import { HomeNavigator } from "./home.navigator";
import { TeamNavigator } from "./team.navigator";
import { ProfileNavigator } from "./profile.navigator";
import { TodoNavigator } from "./todo.navigator";
import Tabbar from "../components/Tabbar";

//======================================================================================================================
// BottomTab Navigator
//======================================================================================================================

export const BottomTabNavigator = () => {
  return (
    <TabNav.Navigator
      initialRouteName={"Home"}
      swipeEnabled={false}
      tabBarPosition={"bottom"}
      tabBar={props => {
        // Get Current Screen
        const currentScreen = getActiveRouteName(props.state);

        // Show Tabbar
        const showTabbar =
          tabbarHiddenScreens.findIndex(name => name === currentScreen) === -1;
        core.ui.setTabbar(showTabbar);

        // Render Tabbar
        return <Tabbar show={showTabbar} {...props} />;
      }}
    >
      <TabNav.Screen name={"Home"} component={HomeNavigator} />

      <TabNav.Screen name={"Teams"} component={TeamNavigator} />

      <TabNav.Screen name={"Todo"} component={TodoNavigator} />

      <TabNav.Screen name={"Profile"} component={ProfileNavigator} />
    </TabNav.Navigator>
  );
};

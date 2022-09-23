import TodoScreen from "../../render/screens/TodoNav/TodoScreen";
import React from "react";
import { defaultNavOptions, StackNav } from "../index";

//======================================================================================================================
//Todo Index
//======================================================================================================================

export const TodoNavigator = () => {
  return (
    <StackNav.Navigator
      initialRouteName={"Todo"}
      screenOptions={defaultNavOptions}
    >
      <StackNav.Screen name={"Todo"} component={TodoScreen} />
    </StackNav.Navigator>
  );
};

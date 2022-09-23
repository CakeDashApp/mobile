import React from "react";
import { defaultNavOptions, StackNav } from "../index";
import SettingsModal from "../../render/screens/ProfileNav/ProfileScreen/modals/SettingsModalNav/SettingsModal";
import AppSettingsModal from "../../render/screens/ProfileNav/ProfileScreen/modals/SettingsModalNav/AppSettingsModal";

//======================================================================================================================
// Settings Navigator
//======================================================================================================================

export const SettingsNavigator = () => {
  return (
    <StackNav.Navigator
      initialRouteName={"SettingsModal"}
      screenOptions={defaultNavOptions}
      mode={"modal"}
    >
      <StackNav.Screen
        name={"SettingsModal"}
        component={SettingsModal}
        options={{
          cardStyle: { backgroundColor: "rgba(0, 0, 0, 0)" },
          cardOverlayEnabled: true,
        }}
      />

      <StackNav.Screen
        name={"AppSettingsModal"}
        component={AppSettingsModal}
        options={{
          cardStyle: { backgroundColor: "rgba(0, 0, 0, 0)" },
          cardOverlayEnabled: true,
        }}
      />
    </StackNav.Navigator>
  );
};

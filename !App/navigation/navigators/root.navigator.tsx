import { defaultNavOptions, RootStackNav } from "../index";
import React from "react";
import { TransitionPresets } from "@react-navigation/stack";
import FindTeamModal from "../../render/screens/TeamNav/TeamListScreen/modals/FindTeamModal";
import EditTeamModal from "../../render/screens/TeamNav/TeamListScreen/modals/EditTeamModal";
import { MainNavigator } from "./main.navigator";
import { SettingsNavigator } from "./settings.navigator";
import EditProfileModal from "../../render/screens/ProfileNav/ProfileScreen/modals/EditProfileModal";
import ChangePasswordModal from "../../render/screens/ProfileNav/ProfileScreen/modals/ChangePasswordModal";
import DefinedCakesModal from "../../render/screens/TeamNav/TeamListScreen/modals/EditTeamModal/components/DefinedCakesView/modals/DefinedCakesModal";
import FullDescriptionModal from "../../render/modals/general/FullDescriptionModal";
import EventsListModal from "../../render/modals/general/EventsListModal";
import MembersListModal from "../../render/modals/general/MembersListModal";
import AddDashModal from "../../render/screens/TeamNav/MemberScreen/modals/AddDashModal";
import CakesListModal from "../../render/modals/general/CakesListModal";
import CreateCakeModal from "../../render/modals/general/CreateCakeModal";
import AllImagesModal from "../../render/modals/general/AllImagesModal";
import VoteDashEventModal from "../../render/modals/events/VoteDashEventModal";
import BringCakeEventModal from "../../render/modals/events/BringCakeEventModal";

//======================================================================================================================
// Root Navigator
//======================================================================================================================

export const RootNavigator = () => {
  return (
    <RootStackNav.Navigator
      screenOptions={{
        ...defaultNavOptions,
        ...{
          gestureEnabled: true,
          cardOverlayEnabled: true,
          transparentCard: true,
          ...TransitionPresets.ModalPresentationIOS,
        },
      }}
      mode={"modal"}
    >
      <RootStackNav.Screen name={"Main"} component={MainNavigator} />

      {/* Modals */}
      <RootStackNav.Screen name={"FindTeamModal"} component={FindTeamModal} />

      <RootStackNav.Screen name={"EditTeamModal"} component={EditTeamModal} />

      <RootStackNav.Screen name={"Settings"} component={SettingsNavigator} />

      <RootStackNav.Screen
        name={"EditProfileModal"}
        component={EditProfileModal}
      />

      <RootStackNav.Screen
        name={"ChangePasswordModal"}
        component={ChangePasswordModal}
      />

      <RootStackNav.Screen
        name={"FullDescriptionModal"}
        component={FullDescriptionModal}
      />

      <RootStackNav.Screen
        name={"DefinedCakesModal"}
        component={DefinedCakesModal}
      />

      <RootStackNav.Screen
        name={"EventsListModal"}
        component={EventsListModal}
      />

      <RootStackNav.Screen
        name={"MembersListModal"}
        component={MembersListModal}
      />

      <RootStackNav.Screen name={"AddDashModal"} component={AddDashModal} />

      <RootStackNav.Screen name={"CakesListModal"} component={CakesListModal} />

      <RootStackNav.Screen
        name={"CreateCakeModal"}
        component={CreateCakeModal}
      />

      <RootStackNav.Screen name={"AllImagesModal"} component={AllImagesModal} />

      <RootStackNav.Screen
        name={"VoteDashEventModal"}
        component={VoteDashEventModal}
      />

      <RootStackNav.Screen
        name={"BringCakeEventModal"}
        component={BringCakeEventModal}
      />
    </RootStackNav.Navigator>
  );
};

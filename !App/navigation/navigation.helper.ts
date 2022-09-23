import { NavigationState } from "@react-navigation/native";

//======================================================================================================================
// Get Active Route Name
//======================================================================================================================

export const getActiveRouteName = (state: NavigationState): string => {
  //Get route
  const route = state.routes[state.index];

  // Dive into nested navigators
  if (route.state) return getActiveRouteName(route.state as NavigationState);

  return route.name;
};

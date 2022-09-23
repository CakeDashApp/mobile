import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { RootNavigator } from "./navigators/root.navigator";

// Hidden Index Screens
export const tabbarHiddenScreens: string[] = ["Member"];

// Navigators
export const RootStackNav = createStackNavigator();
export const StackNav = createStackNavigator();
export const TabNav = createMaterialTopTabNavigator();

// Default NavOptions
export const defaultNavOptions = {
    headerShown: false,

    //Fixed navigation bug on non nav Screens
    // gestureDirection: 'horizontal',
};

//======================================================================================================================
//Render
//======================================================================================================================

const Navigator = () => {
    return <NavigationContainer>{RootNavigator()}</NavigationContainer>;
};

export default Navigator;

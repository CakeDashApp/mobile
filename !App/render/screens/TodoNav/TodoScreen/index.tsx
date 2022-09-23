import React, { useContext, useEffect } from "react";
import { SafeAreaView } from "react-native";
import Headerbar from "../../../../navigation/components/Headerbar";
import { useNavigation } from "@react-navigation/native";
import core from "../../../../src/core";
import strings from "./strings";
import CakesListView from "./components/CakesListView";
import NoCakesView from "./components/NoCakesView";
import { useAgile } from "@agile-ts/react";
import ThemeContext from "../../../../context/ThemeContext";

interface props {}

const TodoScreen: React.FC<props> = (props) => {
  // Navigation
  const navigation = useNavigation();
  const goToCreateCakeModal = (cakeId: string) =>
    navigation.navigate("CreateCakeModal", { cakeId: cakeId });

  // Theme
  const theme = useContext(ThemeContext);

  // Cakes
  const _cakes = useAgile(core.cake.USER_CAKES);
  const cakes = _cakes.filter((cake) => cake.isVisible);

  //======================================================================================================================
  // Header
  //======================================================================================================================

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: (props: any) => {
        return (
          <Headerbar
            {...props}
            title={strings().headerText}
            backgroundColor={theme.colors.background}
            color={theme.colors.on_background}
          />
        );
      },
    });
  });

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {cakes.length > 0 ? (
        <CakesListView cakes={cakes} onCakePressed={goToCreateCakeModal} />
      ) : (
        <NoCakesView />
      )}
    </SafeAreaView>
  );
};

export default TodoScreen;

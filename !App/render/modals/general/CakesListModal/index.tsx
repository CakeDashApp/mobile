import React from "react";
import core from "../../../../src/core";
import { useNavigation, useRoute } from "@react-navigation/native";
import CSectionModal from "../../../components/project/cSectionModal";
import styled from "styled-components/native";
import strings from "./strings";
import { withInteractionsManaged } from "../../../../navigation/helper/with-interactions-managed";
import NavigationLoadingScreen from "../../../../navigation/components/NavigationLoadingScreen";
import NoCakesView from "./components/NoCakesView";
import CakesListView from "./components/CakesListView";
import { useAgile } from "@agile-ts/react";

interface Props {}

const CakesListModal: React.FC<Props> = (props) => {
  // Navigation
  const navigation = useNavigation();
  const route = useRoute();
  const goBack = () => navigation.goBack();
  const goToCreateCakeModal = (cakeId: string) =>
    navigation.navigate("CreateCakeModal", { cakeId: cakeId });

  // Team
  const teamId: string | null = route.params?.teamId || null;

  // Cakes
  const _cakes = useAgile(core.cake.CAKES.getGroup(teamId || ""));
  const cakes = _cakes.filter((cake) => cake.isVisible);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <CSectionModal
      sections={[
        {
          key: 1,
          content: (
            <Container>
              {cakes.length > 0 ? (
                <CakesListView
                  cakes={cakes}
                  onCakePressed={goToCreateCakeModal}
                />
              ) : (
                <NoCakesView />
              )}
            </Container>
          ),
          name: strings().cakesTitle,
          icon: { type: "cake", iconStroke: 2 },
        },
      ]}
      onGoBack={goBack}
      backButton
      scrollView={false}
    />
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const Container = styled.View`
  height: 100%;
`;

export default withInteractionsManaged(CakesListModal, NavigationLoadingScreen);

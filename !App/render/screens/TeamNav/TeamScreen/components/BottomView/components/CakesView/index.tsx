import React, {useContext} from "react";
import styled from "styled-components/native";
import core from "../../../../../../../../src/core";
import CText from "../../../../../../../components/default/cText";
import CIcon from "../../../../../../../../assets/icons/cIcon";
import NoCakesView from "./components/NoCakesView";
import CakesListView from "./components/CakesListView";
import strings from "./strings";
import { useAgile } from "@agile-ts/react";
import ThemeContext from "../../../../../../../../context/ThemeContext";

interface Props {
  teamId: string | null;
  goToCakesListModal: (teamId: string) => void;
  goToCreateCakeModal: (cakeId: string) => void;
}

const CakesView: React.FC<Props> = (props) => {
  // Props
  const { teamId, goToCakesListModal, goToCreateCakeModal } = props;

  // Theme
  const theme = useContext(ThemeContext);

  // Cakes
  const [_cakes] = useAgile([core.cake.CAKES.getGroup(teamId || "")]);
  const cakes = _cakes.filter((cake) => cake.isVisible);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <Container>
      <HeaderContainer>
        <CIcon
          type={"cake"}
          color={theme.colors.on_background}
          size={25}
          strokeWidth={2}
        />
        <CakesText bold color={theme.colors.on_background} size={25}>
          {strings().cakesTitle}
        </CakesText>
      </HeaderContainer>
      {cakes.length > 0 ? (
        <CakesListView
          cakes={cakes}
          onMoreButtonPressed={() => goToCakesListModal(teamId || "")}
          onCakePressed={goToCreateCakeModal}
        />
      ) : (
        <NoCakesView />
      )}
    </Container>
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const Container = styled.View`
  margin: 20px 10px 0 10px;
`;

const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

const CakesText = styled(CText)`
  margin-left: 5px;
`;

export default CakesView;

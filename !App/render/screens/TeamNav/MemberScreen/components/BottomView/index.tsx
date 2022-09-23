import React, {useContext} from "react";
import core from "../../../../../../src/core";
import styled from "styled-components/native";
import CText from "../../../../../components/default/cText";
import strings from "./strings";
import CIcon from "../../../../../../assets/icons/cIcon";
import CakesListView from "./components/CakesListView";
import NoCakesView from "./components/NoCakesView";
import { useAgile } from "@agile-ts/react";
import { ThemeInterface } from "../../../../../../src/core/controllers/ui/interfaces";
import ThemeContext from "../../../../../../context/ThemeContext";

interface Props {
  memberId: string;
}

const BottomView: React.FC<Props> = (props) => {
  // Props
  const { memberId } = props;

  // Theme
  const theme = useContext(ThemeContext);

  // Member
  const member = useAgile(core.member.MEMBERS.getItemById(memberId));

  // Cakes
  const _cakes = useAgile(core.cake.CAKES.getGroup(memberId));
  const cakes = _cakes.filter((cake) => cake.isVisible);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  if (member) {
    return (
      <Container>
        <TitleContainer>
          <TitleIcon
            size={25}
            type={"cake"}
            color={theme.colors.on_background}
            strokeWidth={2}
          />
          <CText bold size={25} color={theme.colors.on_background}>
            {strings().todoTitle}
          </CText>
        </TitleContainer>
        {cakes.length > 0 ? (
          <CakesListView onPressCake={() => {}} cakes={cakes} />
        ) : (
          <NoCakesView />
        )}
      </Container>
    );
  }

  return null;
};

//======================================================================================================================
// Styles
//======================================================================================================================

const Container = styled.View<{ theme: ThemeInterface }>`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
  padding: 10px;
`;

const TitleContainer = styled.View`
  align-items: center;
  flex-direction: row;
  margin-bottom: 5px;
`;

const TitleIcon = styled(CIcon)`
  margin-right: 5px;
`;

export default BottomView;

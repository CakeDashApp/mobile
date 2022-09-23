import React, {useContext} from "react";
import styled from "styled-components/native";
import CText from "../../../../../../../components/default/cText";
import strings from "./strings";
import CIcon from "../../../../../../../../assets/icons/cIcon";
import CStars from "../../../../../../../components/project/cStars";
import ThemeContext from "../../../../../../../../context/ThemeContext";

interface Props {
  bakeSkill: number;
  totalDashes: number;
  totalCakes: number;
}

const StatsView: React.FC<Props> = (props) => {
  // Props
  const { bakeSkill, totalDashes, totalCakes } = props;

  // Theme
  const theme = useContext(ThemeContext);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <Container>
      <TitleContainer>
        <TitleIcon
          size={25}
          type={"barChart"}
          color={theme.colors.on_background}
          strokeWidth={2}
        />
        <CText bold size={25} color={theme.colors.on_background}>
          {strings().statsTitle}
        </CText>
      </TitleContainer>
      <Item>
        <CText color={theme.colors.on_background_2}>
          {strings().bakeSkillTitle}
        </CText>
        <CStars rating={bakeSkill} color={{borderColor: theme.colors.on_surface}}/>
      </Item>
      <Item>
        <CText color={theme.colors.on_background_2}>
          {strings().totalDashesTitle}
        </CText>
        <CText bold size={20} color={theme.colors.on_background}>
          {totalDashes}
        </CText>
      </Item>
      <Item>
        <CText color={theme.colors.on_background_2}>
          {strings().totalCakesTitle}
        </CText>
        <CText bold size={20} color={theme.colors.on_background}>
          {totalCakes}
        </CText>
      </Item>
    </Container>
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const TitleContainer = styled.View`
  align-items: center;
  flex-direction: row;
  margin-bottom: 5px;
`;

const TitleIcon = styled(CIcon)`
  margin-right: 5px;
`;

const Item = styled.View`
  margin: 7px 0;
`;

const Container = styled.View`
  margin-top: 5px;
`;
export default StatsView;

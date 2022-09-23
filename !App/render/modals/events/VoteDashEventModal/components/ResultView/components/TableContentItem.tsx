import React, {useContext} from "react";
import styled from "styled-components/native";
import CText from "../../../../../../components/default/cText";
import ThemeContext from "../../../../../../../context/ThemeContext";

interface Props {
  color: string;
  text: string;
}

const TableOfContentItem: React.FC<Props> = (props) => {
  // Props
  const { color, text } = props;

  // Theme
  const theme = useContext(ThemeContext);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <Container>
      <Square color={color} />
      <CText size={12} color={theme.colors.on_surface}>
        {text}
      </CText>
    </Container>
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 2px;
`;

const Square = styled.View<{ color: string }>`
  width: 10px;
  height: 10px;
  background-color: ${(props) => props.color};
  margin-right: 5px;
`;

export default TableOfContentItem;

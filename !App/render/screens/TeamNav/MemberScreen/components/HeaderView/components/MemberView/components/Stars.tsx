import React, {useContext} from "react";
import styled from "styled-components/native";
import CIcon from "../../../../../../../../../assets/icons/cIcon";
import ThemeContext from "../../../../../../../../../context/ThemeContext";

interface Props {
  stars: number;
}

const Stars: React.FC<Props> = (props) => {
  // Props
  const { stars } = props;

  // Theme
  const theme = useContext(ThemeContext);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <Container>
      <CIcon
        size={25}
        type={"star"}
        color={theme.colors.on_surface}
        fill={stars > 0 && "#FACD28"}
      />
      <CIcon
        size={25}
        type={"star"}
        color={theme.colors.on_surface}
        fill={stars > 1 && "#FACD28"}
      />
      <CIcon
        size={25}
        type={"star"}
        color={theme.colors.on_surface}
        fill={stars > 2 && "#FACD28"}
      />
      <CIcon
        size={25}
        type={"star"}
        color={theme.colors.on_surface}
        fill={stars > 3 && "#FACD28"}
      />
      <CIcon
        size={25}
        type={"star"}
        color={theme.colors.on_surface}
        fill={stars > 4 && "#FACD28"}
      />
    </Container>
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const Container = styled.View`
  flex-direction: row;
`;

export default Stars;

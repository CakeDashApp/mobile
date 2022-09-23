import React, {useContext} from "react";
import styled from "styled-components/native";
import CIcon from "../../../../../assets/icons/cIcon";
import ThemeContext from "../../../../../context/ThemeContext";

interface Props {}

const NoImagesView: React.FC<Props> = (props) => {
  // Theme
  const theme = useContext(ThemeContext);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <Container>
      <CIcon type={"image"} color={theme.colors.on_surface} size={100} />
    </Container>
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const Container = styled.View`
  align-items: center;
  justify-content: center;
  height: 85%;
`;

export default NoImagesView;

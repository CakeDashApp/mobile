import React, {useContext} from "react";
import CRefresh from "../../../project/cRefresh";
import styled from "styled-components/native";
import { ThemeInterface } from "../../../../../src/core/controllers/ui/interfaces";
import ThemeContext from "../../../../../context/ThemeContext";

interface Props {
  height: string | number;
  imageContainerStyles: object;
}

const LoadingView: React.FC<Props> = (props) => {
  // Props
  const { height, imageContainerStyles } = props;

  // Theme
  const theme = useContext(ThemeContext);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <Container style={imageContainerStyles}>
      <CRefresh
        size={(typeof height === "number" && height / 3) || 30}
        color={theme.colors.on_surface}
      />
    </Container>
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const Container = styled.View<{ theme: ThemeInterface }>`
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.on_surface_3};
`;

export default LoadingView;

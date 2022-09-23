import React from "react";
import styled from "styled-components/native";
import core from "../../../../../src/core";
import CIcon from "../../../../../assets/icons/cIcon";
import { useAgile } from "@agile-ts/react";

interface Props {
  color: string;
  icon: string;
  showIcon: boolean;
  height: string | number;
  imageContainerStyles: object;
}

const NoImageView: React.FC<Props> = (props) => {
  // Theme
  const themeType = useAgile(core.ui.THEME_TYPE);

  // Props
  const { height, imageContainerStyles, showIcon, icon } = props;
  const color: string = core.helper.color.LightenDarkenColor(
    props.color,
    themeType === "light" ? -50 : 0
  );

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <Container color={color} style={imageContainerStyles}>
      {showIcon && (
        <CIcon
          type={icon}
          backgroundColor={color}
          size={(typeof height === "number" && height / 2) || 50}
        />
      )}
    </Container>
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const Container = styled.View<{ color: string }>`
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.color};
`;

export default NoImageView;

import CText from "../../../default/cText";
import React, {useContext} from "react";
import styled from "styled-components/native";
import { LabelType } from "../../../../../src/core/controllers/event/event.interface";
import ThemeContext from "../../../../../context/ThemeContext";

interface Props {
  type: LabelType;
  backgroundColor: string;
  isDummy?: boolean;
}

const Label: React.FC<Props> = (props) => {
  // Props
  const { type, backgroundColor, isDummy } = props;

  // Theme
  const theme = useContext(ThemeContext);

  // Label KeyMap
  const labelKeyMap = {
    vote: "#D045E7",
    info: "#27B0CE",
    cake: "#D7EC2B",
    error: "#E33636",
  };

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <LabelBackgroundContainer backgroundColor={backgroundColor}>
      <LabelContainer
        color={!isDummy ? labelKeyMap[type] : theme.colors.on_surface_3}
      >
        <CText
          size={10}
          color={!isDummy ? "white" : theme.colors.on_surface_3}
          bold
        >
          {type.toUpperCase()}
        </CText>
      </LabelContainer>
    </LabelBackgroundContainer>
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const LabelContainer = styled.View<{ color: string }>`
  background-color: ${(props) => props.color};
  padding: 2px 5px;
  border-radius: 100px;
`;

const LabelBackgroundContainer = styled.View<{ backgroundColor: string }>`
  position: absolute;
  bottom: 0;
  right: 8px;
  background-color: ${(props) => props.backgroundColor};
  padding: 2px;
  border-radius: 100px;
`;

export default Label;

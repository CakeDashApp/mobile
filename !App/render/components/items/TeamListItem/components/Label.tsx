import CText from "../../../default/cText";
import React from "react";
import styled from "styled-components/native";

interface Props {
  type: "open" | "closed" | "invite";
  backgroundColor: string;
}

const Label: React.FC<Props> = (props) => {
  // Props
  const { type, backgroundColor } = props;

  // Label KeyMap
  const labelKeyMap = {
    open: "#31D075",
    closed: "#D03131",
    invite: "#D045E7",
  };

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <LabelBackgroundContainer backgroundColor={backgroundColor}>
      <LabelContainer color={labelKeyMap[type]}>
        <CText size={10} color={"white"} bold>
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

import React from "react";
import styled from "styled-components/native";
import { StatusType } from "../../../../../src/core/controllers/user/user.interface";

interface Props {
  type: StatusType;
  backgroundColor: string;
}

const StatusLabel: React.FC<Props> = (props) => {
  // Props
  const { type, backgroundColor } = props;

  // Label KeyMap
  const labelKeyMap = {
    away: {
      color: "#dbe360",
    },
    offline: {
      color: "#929292",
    },
    online: {
      color: "#72e360",
    },
  };

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <LabelBackgroundContainer backgroundColor={backgroundColor}>
      <LabelContainer color={labelKeyMap[type].color || labelKeyMap.offline} />
    </LabelBackgroundContainer>
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const LabelContainer = styled.View<{ color: string }>`
  background-color: ${(props) => props.color};
  width: 15px;
  height: 15px;
  border-radius: 100px;
  align-items: center;
  justify-content: center;
`;

const LabelBackgroundContainer = styled.View<{ backgroundColor: string }>`
  position: absolute;
  bottom: 0;
  right: 8px;
  background-color: ${(props) => props.backgroundColor};
  border-radius: 100px;
  align-items: center;
  justify-content: center;
  padding: 2px;
`;

export default StatusLabel;

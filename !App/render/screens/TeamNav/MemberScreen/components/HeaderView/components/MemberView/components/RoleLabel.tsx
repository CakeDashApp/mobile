import React from "react";
import styled from "styled-components/native";
import CText from "../../../../../../../../components/default/cText";
import { RoleType } from "../../../../../../../../../src/core/controllers/member/member.interface";

interface Props {
  type: RoleType;
}

const RoleLabel: React.FC<Props> = (props) => {
  // Props
  const { type } = props;

  // Label KeyMap
  const labelKeyMap: { [key: string]: string } = {
    admin: "#D045E7",
    member: "#31D075",
    creator: "#F9DA61",
  };

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <LabelContainer color={labelKeyMap[type]}>
      <CText size={10} color={"white"} bold>
        {type.toUpperCase()}
      </CText>
    </LabelContainer>
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const LabelContainer = styled.View<{ color: string }>`
  background-color: ${(props) => props.color};
  padding: 2px 5px;
  border-radius: 100px;
  align-self: flex-start;
  margin-top: 3px;
`;

export default RoleLabel;

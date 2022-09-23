import React from "react";
import CIcon from "../../../assets/icons/cIcon";
import CBlock from "../default/cBlock";

interface Props {
  size?: number;
  color?: string;
}

const CRefresh: React.FC<Props> = (props) => {
  // Props
  const color = props.color || "black";
  const size = props.size || 30;

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <CBlock flex={false} iterationCount="infinite" animation={"rotate"}>
      <CIcon type={"refresh"} size={size} color={color} />
    </CBlock>
  );
};

export default CRefresh;

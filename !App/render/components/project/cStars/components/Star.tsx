import React from "react";
import CIcon from "../../../../../assets/icons/cIcon";

interface Props {
  color?: {
    color?: string;
    borderColor?: string;
  };
  size?: number;
  filled: boolean;
}

const Star: React.FC<Props> = (props) => {
  // Props
  const { filled } = props;
  const color = {
    ...{
      color: "yellow",
      borderColor: "black",
    },
    ...props.color,
  };
  const size = props.size || 25;

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <CIcon
      type={"star"}
      color={color.borderColor}
      size={size}
      fill={filled && color.color}
    />
  );
};

export default Star;

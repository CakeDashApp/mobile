import React from "react";
import styled from "styled-components/native";
import CComponentImagePicker from "../../../default/ImagePicker/cComponentImagePicker";
import { ImageInterface } from "../../../../../src/core/controllers/image/image.interface";
import { ThemeInterface } from "../../../../../src/core/controllers/ui/interfaces";

interface SizeInterface {
  width: number;
  height: number;
}

interface Props {
  onPress?: (image: ImageInterface) => void;
  size?: SizeInterface;
}

const GrayImage: React.FC<Props> = (props) => {
  // Props
  const { children, onPress } = props;
  const size: SizeInterface = props.size || {
    width: 100,
    height: 100,
  };

  //======================================================================================================================
  // Render
  //======================================================================================================================

  if (onPress)
    return (
      <CComponentImagePicker onImageChange={onPress}>
        <Image width={size.width} height={size.height}>
          {children}
        </Image>
      </CComponentImagePicker>
    );

  return (
    <Image width={size.width} height={size.height}>
      {children}
    </Image>
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const Image = styled.View<{
  height: number;
  width: number;
  theme: ThemeInterface;
}>`
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.on_surface_3};
  align-items: center;
  justify-content: center;
`;

export default GrayImage;

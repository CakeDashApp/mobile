import React, {useCallback, useContext, useEffect, useState} from "react";
import { ImageSourcePropType, TouchableOpacity } from "react-native";
import * as manager from "../controller";
import CImage from "../../cImage";
import styled from "styled-components/native";
import { ImageInterface } from "../../../../../src/core/controllers/image/image.interface";
import { ErrorInterface } from "../../../../../src/core/controllers/error/error.interface";
import ThemeContext from "../../../../../context/ThemeContext";

export interface Props {
  // Methods
  onImageChange: (image: ImageInterface) => void;

  // Default Image
  defaultImage?: ImageInterface | null;
  defaultImageId?: string | null;
  defaultSource?: ImageSourcePropType;

  // Set Image
  image?: ImageInterface | null;

  // Other
  reset?: boolean;
  unchangeable?: boolean;
  round?: boolean;
  shadow?: boolean;

  // Size
  size?: number;
  width?: number;
  height?: number;

  //Style
  style?: object;
}

const CImagePicker: React.FC<Props> = (props) => {
  // Props
  const {
    onImageChange,
    defaultImage,
    defaultImageId,
    defaultSource,
    reset,
    unchangeable,
    size,
    round,
    shadow,
    style,
  } = props;
  const width = size || props.width || 100;
  const height = size || props.height || 100;

  // Image
  const [_image, setImage] = useState<ImageInterface | null>(null);
  const image = props.image || _image;

  // Theme
  const theme = useContext(ThemeContext);

  //======================================================================================================================
  // Reset Image
  //======================================================================================================================

  useEffect(() => {
    if (reset) setImage(defaultImage || null);
  }, [reset, defaultImage]);

  //======================================================================================================================
  // Image Picker
  //======================================================================================================================

  const openImagePicker = useCallback(async () => {
    // Get Select Method
    const useCamera: boolean | null = await manager.getSelectImageMethod();

    if (useCamera !== null) {
      // Get Image
      const image: ImageInterface | ErrorInterface = await manager.getImage(
        useCamera,
        round
      );

      if (!("error" in image)) {
        setImage(image);
        onImageChange(image);
      } else {
        manager.handleError(image);
      }
    }
  }, [manager]);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <ImageContainer
      style={[style, shadow ? theme.shadow : null]}
      width={width}
      height={height}
    >
      <TouchableOpacity onPress={openImagePicker} disabled={unchangeable}>
        <CImage
          id={defaultImageId}
          image={image || defaultImage}
          source={!image ? defaultSource : undefined}
          width={width}
          height={height}
          round={round}
        />
      </TouchableOpacity>
    </ImageContainer>
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const ImageContainer = styled.View<{ width: number; height: number }>`
  overflow: hidden;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
`;

export default CImagePicker;

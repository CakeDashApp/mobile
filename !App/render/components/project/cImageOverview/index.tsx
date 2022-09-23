import React, {useContext} from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";
import CImage from "../../default/cImage";
import GrayImage from "./components/GrayImage";
import CText from "../../default/cText";
import { ImageInterface } from "../../../../src/core/controllers/image/image.interface";
import { ThemeInterface } from "../../../../src/core/controllers/ui/interfaces";
import ThemeContext from "../../../../context/ThemeContext";

interface SizeInterface {
  width: number;
  height: number;
}

interface Props {
  images: (ImageInterface | string)[];
  maxShownImages: number;
  onPress?: () => void;
  size?: SizeInterface;
  style?: object;
}

const CImageOverview: React.FC<Props> = (props) => {
  // Props
  const { images, maxShownImages, onPress, style } = props;
  const size: SizeInterface = props.size || {
    width: 100,
    height: 100,
  };

  // Theme
  const theme = useContext(ThemeContext);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <ImagesContainer height={size.height} style={style}>
      {/* Why placing the touchable so wired.. because otherwise I can't get it to run on android and ios :/ */}
      {images.map((image: ImageInterface | string, index: number) => {
        // Render Image
        if (index < maxShownImages - 1 || images.length === maxShownImages)
          return (
            <ImageContainer
              imageWidth={size.width}
              imageHeight={size.height}
              index={index}
              key={index}
            >
              <TouchableOpacity onPress={onPress} disabled={!onPress}>
                <Image
                  width={size.width}
                  height={size.height}
                  image={typeof image !== "string" ? image : undefined}
                  id={typeof image === "string" ? image : undefined}
                />
              </TouchableOpacity>
            </ImageContainer>
          );

        // Render More Image
        if (index === maxShownImages)
          return (
            <ImageContainer
              imageWidth={size.width}
              imageHeight={size.height}
              index={index}
              key={index}
            >
              <TouchableOpacity onPress={onPress} disabled={!onPress}>
                <GrayImage size={size}>
                  <CText color={theme.colors.on_surface} size={20}>
                    +{images.length - maxShownImages}
                  </CText>
                </GrayImage>
              </TouchableOpacity>
            </ImageContainer>
          );
      })}
    </ImagesContainer>
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const ImagesContainer = styled.View<{ height: number }>`
  flex-direction: row;
  height: ${(props) => props.height}px;
`;

const Image = styled(CImage)`
  border-radius: 10px;
`;

const ImageContainer = styled.View<{
  imageWidth: number;
  imageHeight: number;
  index: number;
  theme: ThemeInterface;
}>`
  border-radius: 10px;
  width: ${(props) => props.imageWidth + 5}px;
  position: absolute;
  left: ${(props) => props.index * 20}px;
  bottom: 0;
  background-color: ${(props) => props.theme.colors.surface};
  align-items: flex-end;
`;

export default CImageOverview;

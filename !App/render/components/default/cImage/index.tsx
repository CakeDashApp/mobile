import React, { useCallback, useEffect, useState } from "react";
import {
  Image,
  ImageResizeMode,
  ImageSourcePropType,
  Platform,
  View,
} from "react-native";
import core from "../../../../src/core";
import LoadingView from "./components/LoadingView";
import NoImageView from "./components/NoImageView";
import { ErrorInterface } from "../../../../src/core/controllers/error/error.interface";
import { ImageInterface } from "../../../../src/core/controllers/image/image.interface";

interface Props {
  // Source
  id?: string | null;
  image?: ImageInterface | null;
  source?: ImageSourcePropType;

  // Size
  width?: number | string;
  height?: number | string;
  resizeMode?: ImageResizeMode;

  // Other
  round?: boolean;
  shadow?: boolean;
  showIcon?: boolean;

  // Style
  style?: object;
  imageStyle?: object;
}

const CImage: React.FC<Props> = (props) => {
  // Props
  const { id, style, round, shadow, imageStyle } = props;
  const showIcon = props.showIcon !== undefined ? props.showIcon : true;
  const width = props.width || 100;
  const height = props.height || 100;
  const resizeMode: ImageResizeMode = props.resizeMode || "cover";
  const [image, setImage] = useState<ImageInterface | null>(
    props.image || null
  );
  const [source, setSource] = useState<ImageSourcePropType | null>(
    props.source || null
  );

  // Default
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Images
  const [errorImagePath] = useState(
    require("../../../../assets/images/noImage.png")
  );

  // Source
  const imageSource =
    image?.imageData && "source" in image?.imageData
      ? image.imageData.source
      : source || errorImagePath;

  //======================================================================================================================
  // Handle Props
  //======================================================================================================================

  useEffect(() => {
    if (id && image?.id !== id) loadImage(id);
  }, [id]);

  useEffect(() => {
    setImage(props.image || null);
  }, [props.image]);

  useEffect(() => {
    setSource(props.source || null);
  }, [props.source]);

  //======================================================================================================================
  // Image Styles
  //======================================================================================================================

  const imageContainerStyle: (object | undefined)[] = [
    // Default
    {
      overflow: "hidden",
      alignItem: "center",
      justifyContent: "center",
      width: width,
      height: height,
    },

    // Other
    (round && { borderRadius: 1000, overflow: "hidden" }) || undefined,
    (shadow && {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,

      elevation: 4,
    }) ||
      undefined,

    // Style
    style,
  ].filter((style) => style !== undefined);

  const _imageStyle: (object | undefined)[] = [
    {
      resizeMode: resizeMode,
      width: width,
      height: height,
    },

    // Style
    imageStyle,
  ].filter((style) => style !== undefined);

  //======================================================================================================================
  // Load Image
  //======================================================================================================================

  const loadImage = useCallback(async (id: string) => {
    setIsLoading(true);

    //Get Image
    const image: ImageInterface | ErrorInterface = await core.image.fetchImage(
      id
    );
    if (!("error" in image)) setImage(image);

    setIsLoading(false);
  }, []);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  if (isLoading)
    return (
      <LoadingView height={height} imageContainerStyles={imageContainerStyle} />
    );

  if (image?.imageData && !("source" in image?.imageData) && !source)
    return (
      <NoImageView
        color={image.imageData.color}
        icon={image.imageData.icon}
        showIcon={showIcon}
        imageContainerStyles={imageContainerStyle}
        height={height}
      />
    );

  return (
    <View style={imageContainerStyle}>
      <Image
        style={_imageStyle}
        resizeMethod={"auto"}
        source={imageSource}
        /* Default Source fixed flickering during a rerender on ios*/
        defaultSource={Platform.OS === "ios" ? imageSource : undefined}
      />
    </View>
  );
};

export default CImage;

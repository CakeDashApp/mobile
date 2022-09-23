import React, {useContext, useState} from "react";
import { View } from "react-native";
import * as controller from "../controller";
import styled from "styled-components/native";
import GrayImage from "../../../../components/project/cImageOverview/components/GrayImage";
import CIcon from "../../../../../assets/icons/cIcon";
import CText from "../../../../components/default/cText";
import CImageOverview from "../../../../components/project/cImageOverview";
import { ImageInterface } from "../../../../../src/core/controllers/image/image.interface";
import ThemeContext from "../../../../../context/ThemeContext";

interface Props {
  onAddImagePressed: (image: ImageInterface) => void;
  onShowAllImagesPressed: () => void;
  showInputError: boolean;
}

const ImagesView: React.FC<Props> = (props) => {
  // Props
  const { onAddImagePressed, onShowAllImagesPressed, showInputError } = props;

  // Theme
  const theme = useContext(ThemeContext);

  // Images
  const images: ImageInterface[] = controller.CakeEditor.getValue("images");
  const [imageWidth] = useState<number>(100);
  const [imageHeight] = useState<number>(120);
  const [maxShownImages] = useState<number>(5);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <View>
      <Container>
        <GrayImage
          onPress={onAddImagePressed}
          size={{
            width: imageWidth,
            height: imageHeight,
          }}
        >
          <CIcon type={"plus"} color={theme.colors.on_surface} size={50} />
        </GrayImage>

        <CImageOverview
          images={images}
          maxShownImages={maxShownImages}
          size={{
            width: imageWidth,
            height: imageHeight,
          }}
          onPress={onShowAllImagesPressed}
        />
      </Container>
      {showInputError && (
        <ErrorText color={theme.colors.error}>
          {controller.CakeEditor.getStatusMessage("images")}
        </ErrorText>
      )}
    </View>
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const Container = styled.View`
  flex-direction: row;
`;

const ErrorText = styled(CText)`
  margin-top: 5px;
`;

export default ImagesView;

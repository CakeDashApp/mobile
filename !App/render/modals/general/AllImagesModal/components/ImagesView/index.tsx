import React, { useState } from "react";
import styled from "styled-components/native";
import AllImage from "./components/AllImage";
import FullScreenImageModal from "./components/FullScreenImageModal";
import { ImageInterface } from "../../../../../../src/core/controllers/image/image.interface";

interface Props {
  onRemoveImage: (id: string) => void;
  canRemoveImage: boolean;
  images: (ImageInterface | string)[];
}

const ImagesView: React.FC<Props> = (props) => {
  // Props
  const { onRemoveImage, images, canRemoveImage } = props;

  // Images
  const [modalImage, setModalImage] = useState<ImageInterface | string | null>(
    null
  );
  const [showFullScreenImageModal, setShowFullScreenImageModal] = useState<
    boolean
  >(false);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <Container>
      <ImagesContainer>
        {images.map((image: ImageInterface | string, index: number) => {
          return (
            <AllImage
              canRemoveImage={canRemoveImage}
              image={image}
              onRemoveImage={onRemoveImage}
              onPress={() => {
                setModalImage(image);
                setShowFullScreenImageModal(true);
              }}
              key={index}
            />
          );
        })}
      </ImagesContainer>
      <FullScreenImageModal
        show={showFullScreenImageModal}
        image={modalImage}
        onClose={() => setShowFullScreenImageModal(false)}
      />
    </Container>
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const ImagesContainer = styled.View`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Container = styled.View`
  flex: 1;
`;

export default ImagesView;

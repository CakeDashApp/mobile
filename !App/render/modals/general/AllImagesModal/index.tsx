import React, { useCallback, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import CSectionModal from "../../../components/project/cSectionModal";
import NoImagesView from "./components/NoImagesView";
import ImagesView from "./components/ImagesView";
import CBottomButton from "../../../components/project/cBottomButton";
import CComponentImagePicker from "../../../components/default/ImagePicker/cComponentImagePicker";
import strings from "./strings";
import { ImageInterface } from "../../../../src/core/controllers/image/image.interface";

interface Props {}

const AllImagesModal: React.FC<Props> = (props) => {
  // Navigation
  const navigation = useNavigation();
  const goBack = () => navigation.goBack();
  const route = useRoute();
  const onAddImage: (image: ImageInterface) => void | null =
    route.params?.onAddImage || null;
  const onRemoveImage: (id: string) => void | null =
    route.params?.onRemoveImage || null;
  const _images: ImageInterface[] | string[] = route.params?.images || [];
  const [images, setImages] = useState<(ImageInterface | string)[]>(_images);
  const canRemoveImage: boolean = !!onRemoveImage;
  const canAddImage: boolean = !!onAddImage;

  //======================================================================================================================
  // On Remove Image
  //======================================================================================================================

  const _onRemoveImage = useCallback(
    (id: string) => {
      // Update Images
      let newImages: (ImageInterface | string)[] = [...images];
      newImages = newImages.filter((image) =>
        typeof image === "string" ? image : image.id !== id
      );
      setImages(newImages);

      onRemoveImage(id);
    },
    [onRemoveImage, images]
  );

  //======================================================================================================================
  // On Adds Image
  //======================================================================================================================

  const _onAddImage = useCallback(
    (image: ImageInterface) => {
      // Update Images
      const newImages: (ImageInterface | string)[] = [...images];
      newImages.push(image);
      setImages(newImages);

      onAddImage(image);
    },
    [onAddImage, images]
  );

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <CSectionModal
      sections={[
        {
          key: 1,
          content:
            images.length > 0 ? (
              <ImagesView
                canRemoveImage={canRemoveImage}
                onRemoveImage={_onRemoveImage}
                images={images}
              />
            ) : (
              <NoImagesView />
            ),
          name: strings().imagesTitle,
          icon: { type: "image", iconStroke: 2 },
        },
      ]}
      onGoBack={goBack}
      backButton
      flex={images.length > 0 ? undefined : 1}
      bottomButtons={
        canAddImage && [
          <CComponentImagePicker onImageChange={_onAddImage}>
            <CBottomButton
              onPress={() => {}}
              icon={"plus"}
              secondary
              show={true}
              disabled={true}
            />
          </CComponentImagePicker>,
        ]
      }
    />
  );
};

export default AllImagesModal;

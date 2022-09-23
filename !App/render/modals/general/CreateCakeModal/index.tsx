import React, { useCallback, useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import strings from "./strings";
import * as controller from "./controller";
import { DropDownHolder } from "../../../components/project/DropDownHolder";
import CSectionModal from "../../../components/project/cSectionModal";
import ImagesView from "./components/ImagesView";
import TextView from "./components/TextView";
import core from "../../../../src/core";
import styled from "styled-components/native";
import CFullScreenInfo from "../../../components/project/cFullScreenInfo";
import { ImageInterface } from "../../../../src/core/controllers/image/image.interface";
import { useAgile } from "@agile-ts/react";

interface Props {}

const CreateCakeModal: React.FC<Props> = (props) => {
  // Navigation
  const navigation = useNavigation();
  const goBack = () => navigation.goBack();
  const goToAllImagesModal = (
    onRemoveImage: (id: string) => void,
    onAddImage: (image: ImageInterface) => void,
    images: ImageInterface[]
  ) =>
    navigation.navigate("AllImagesModal", {
      onRemoveImage: onRemoveImage,
      onAddImage: onAddImage,
      images: images,
    });
  const route = useRoute();

  // Default
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Error
  const [showInputError, setShowInputError] = useState<boolean>(false);

  // Cake
  const cakeId: string | null = route.params?.cakeId || null;
  const cake = useAgile(core.cake.CAKES.getItemById(cakeId || ""));
  const defaultCakeImage = useAgile(
    core.image.IMAGES.getItemById(cake?.cakeData.product.imageId || "")
  );

  // TextView
  const [textViewIsFocused, setTextViewIsFocused] = useState<boolean>(false);

  // Make Form reactive
  useAgile(controller.CakeEditor.dependencies);

  //======================================================================================================================
  // Set Values of Editor
  //======================================================================================================================

  useEffect(() => {
    controller.setCakeEditorValues(cakeId, cake, defaultCakeImage);
  }, [cakeId]);

  //======================================================================================================================
  // On Submit
  //======================================================================================================================

  const onSubmit = useCallback(async () => {
    setIsLoading(true);
    setShowInputError(false);

    // Submit
    const submitResponse = await controller.CakeEditor.submit();

    // Drop Down Error
    if (submitResponse !== null && "error" in submitResponse) {
      DropDownHolder.dropDown?.alertWithType(
        "error",
        "Error",
        submitResponse.error.message
      );
      setShowInputError(submitResponse.error.type === "input");
    }

    // Drop Down Success
    if (submitResponse !== null && "success" in submitResponse)
      DropDownHolder.dropDown?.alertWithType(
        "success",
        submitResponse.success.title || "Success",
        submitResponse.success.message
      );

    // Go Back
    if (submitResponse === null || !("error" in submitResponse)) goBack();

    setIsLoading(false);
  }, []);

  //======================================================================================================================
  // On Go Back
  //======================================================================================================================

  const onGoBack = useCallback(() => {
    // Reset Input Error
    setShowInputError(false);

    // Go Back
    goBack();
  }, []);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <Container>
      {cake ? (
        <CSectionModal
          sections={[
            {
              key: 1,
              content: (
                <ImagesView
                  showInputError={showInputError}
                  onAddImagePressed={controller.addImage}
                  onShowAllImagesPressed={() =>
                    goToAllImagesModal(
                      controller.removeImage,
                      controller.addImage,
                      controller.CakeEditor.getValue("images")
                    )
                  }
                />
              ),
              name: strings().imagesTitle,
              icon: { type: "image", iconStroke: 2 },
            },
            {
              key: 2,
              content: (
                <TextView
                  showInputError={showInputError}
                  onFocus={() => setTextViewIsFocused(true)}
                  onBlur={() => setTextViewIsFocused(false)}
                />
              ),
              name: strings().textTile,
              icon: { type: "fileText", iconStroke: 2 },
            },
          ]}
          onGoBack={onGoBack}
          onSubmit={onSubmit}
          submitButton={true}
          backButton
          showSections={(textViewIsFocused && [2]) || undefined}
          isLoading={isLoading}
        />
      ) : (
        <CFullScreenInfo error />
      )}
    </Container>
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const Container = styled.View`
  flex: 1;
`;

export default CreateCakeModal;

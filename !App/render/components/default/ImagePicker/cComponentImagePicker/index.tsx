import React, { useCallback } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as manager from "../controller";
import { ErrorInterface } from "../../../../../src/core/controllers/error/error.interface";
import { ImageInterface } from "../../../../../src/core/controllers/image/image.interface";

export interface Props {
  onImageChange: (image: ImageInterface) => void;
}

const CComponentImagePicker: React.FC<Props> = (props) => {
  // Props
  const { onImageChange, children } = props;

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
        false
      );

      if (!("error" in image)) {
        onImageChange(image);
      } else {
        manager.handleError(image);
      }
    }
  }, [manager, onImageChange]);

  //======================================================================================================================
  //Render
  //======================================================================================================================

  return (
    <TouchableOpacity onPress={openImagePicker}>{children}</TouchableOpacity>
  );
};

export default CComponentImagePicker;

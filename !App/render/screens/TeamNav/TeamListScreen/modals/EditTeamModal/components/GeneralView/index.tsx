import React, { useEffect, useState } from "react";
import { View } from "react-native";
import TeamImagePicker from "./components/TeamImagePicker";
import * as controller from "../../controller";
import styled from "styled-components/native";
import DescriptionInput from "./components/DescriptionInput";
import NameInput from "./components/NameInput";
import { ImageInterface } from "../../../../../../../../src/core/controllers/image/image.interface";

interface Props {
  showInputError: boolean;
  onFocus: () => void;
  onBlur: () => void;
}

const GeneralView: React.FC<Props> = (props) => {
  // Props
  const { showInputError, onFocus, onBlur } = props;

  // Is Focused
  const [descriptionIsFocused, setDescriptionIsFocused] = useState<boolean>(
    false
  );
  const [nameIsFocused, setNameIsFocused] = useState<boolean>(false);

  //======================================================================================================================
  // Handle Is Focused
  //======================================================================================================================

  useEffect(() => {
    if (descriptionIsFocused || nameIsFocused) onFocus();
    else onBlur();
  }, [descriptionIsFocused, nameIsFocused]);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <View>
      <ImageNameContainer>
        <TeamImagePicker
          onImageChange={(image: ImageInterface) =>
            controller.TeamEditor.setValue("image", image)
          }
          defaultImage={controller.TeamEditor.getOriginalValue("image")}
          image={controller.TeamEditor.getValue("image")}
        />
        <NameInput
          showInputError={showInputError}
          onFocus={() => setNameIsFocused(true)}
          onBlur={() => setNameIsFocused(false)}
        />
      </ImageNameContainer>
      <DescriptionInput
        showInputError={showInputError}
        onFocus={() => setDescriptionIsFocused(true)}
        onBlur={() => setDescriptionIsFocused(false)}
      />
    </View>
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const ImageNameContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export default GeneralView;

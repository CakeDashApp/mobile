import React from "react";
import styled from "styled-components/native";
import CImage from "../../../../../../../components/default/cImage";
import RemoveButton from "./components/RemoveButton";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ImageInterface } from "../../../../../../../../src/core/controllers/image/image.interface";
import { ThemeInterface } from "../../../../../../../../src/core/controllers/ui/interfaces";

interface Props {
  image: ImageInterface | string;
  onRemoveImage: (id: string) => void;
  canRemoveImage: boolean;
  onPress: () => void;
}

const AllImage: React.FC<Props> = (props) => {
  // Props
  const { image, onRemoveImage, onPress, canRemoveImage } = props;

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <Container>
      <TouchableOpacity onPress={onPress}>
        <CImage
          id={typeof image === "string" ? image : undefined}
          image={typeof image !== "string" ? image : undefined}
          width={"100%"}
          height={"100%"}
          style={{ borderRadius: 20 }}
        />
        {canRemoveImage && (
          <RemoveButton
            onPress={() =>
              onRemoveImage(typeof image === "string" ? image : image.id)
            }
          />
        )}
      </TouchableOpacity>
    </Container>
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const Container = styled.View<{ theme: ThemeInterface }>`
  width: 50%;
  height: 200px;
  background-color: ${(props) => props.theme.colors.surface};
  padding: 2px;
`;

export default AllImage;

import React, {useContext} from "react";
import { View } from "react-native";
import * as controller from "../../../controller";
import CIcon from "../../../../../../../../../assets/icons/cIcon";
import CImagePicker from "../../../../../../../../components/default/ImagePicker/cImagePicker";
import styled from "styled-components/native";
import { ImageInterface } from "../../../../../../../../../src/core/controllers/image/image.interface";
import { ThemeInterface } from "../../../../../../../../../src/core/controllers/ui/interfaces";
import ThemeContext from "../../../../../../../../../context/ThemeContext";

interface Props {
  onImageChange: (image: ImageInterface) => void;
  defaultImage: ImageInterface | null;
  image: ImageInterface | null;
}

const TeamImagePicker: React.FC<Props> = (props) => {
  // Props
  const { onImageChange, defaultImage, image } = props;

  // Has Changed
  const isModified = controller.TeamEditor.isModified(["image"]);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <View>
      <CImagePicker
        defaultImage={defaultImage}
        image={image}
        onImageChange={onImageChange}
        round
      />
      <EditIcon isModified={isModified} />
    </View>
  );
};

//======================================================================================================================
// Components
//======================================================================================================================

const EditIcon = (props: { isModified: boolean }) => {
  const theme = useContext(ThemeContext);
  return (
    <IconBackgroundContainer>
      <IconContainer isModified={props.isModified}>
        <CIcon
          type={"pen"}
          size={15}
          color={
            props.isModified
              ? theme.colors.on_secondary
              : theme.colors.on_primary
          }
          fill
        />
      </IconContainer>
    </IconBackgroundContainer>
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const IconBackgroundContainer = styled.View<{ theme: ThemeInterface }>`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
  background-color: ${(props) => props.theme.colors.surface};
`;

const IconContainer = styled.View<{
  theme: ThemeInterface;
  isModified: boolean;
}>`
  width: 25px;
  height: 25px;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
  background-color: ${(props) =>
    props.isModified
      ? props.theme.colors.secondary
      : props.theme.colors.primary};
`;

export default TeamImagePicker;

import React, {useContext} from "react";
import styled from "styled-components/native";
import CText from "../../../../components/default/cText";
import core from "../../../../../src/core";
import CImageOverview from "../../../../components/project/cImageOverview";
import { TouchableOpacity, View } from "react-native";
import ThemeContext from "../../../../../context/ThemeContext";

interface Props {
  description: string;
  title: string;
  imageIds: string[];
  onShowAllImages: () => void;
  onShowFullDescription: () => void;
}

const TopView: React.FC<Props> = (props) => {
  // Props
  const {
    description,
    title,
    imageIds,
    onShowAllImages,
    onShowFullDescription,
  } = props;

  // Theme
    const theme = useContext(ThemeContext);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <View>
      <CText bold size={30} color={theme.colors.on_surface}>
        {title}
      </CText>
      <Images
        images={imageIds}
        maxShownImages={5}
        size={{
          height: 120,
          width: 100,
        }}
        onPress={onShowAllImages}
      />
      <TouchableOpacity onPress={onShowFullDescription}>
        <Description color={theme.colors.on_surface}>
          {core.helper.text.shortText(description, 200)}
        </Description>
      </TouchableOpacity>
    </View>
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const Description = styled(CText)`
  margin-top: 10px;
`;

const Images = styled(CImageOverview)`
  margin-top: 10px;
`;

export default TopView;

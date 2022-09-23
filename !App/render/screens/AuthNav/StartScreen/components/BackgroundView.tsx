import React, { useState } from "react";
import styled from "styled-components/native";
import { Dimensions, View } from "react-native";
import CImage from "../../../../components/default/cImage";
import { ThemeInterface } from "../../../../../src/core/controllers/ui/interfaces";

interface Props {}

const BackgroundView: React.FC<Props> = (props) => {
  // Images
  const [cakeBackgroundPath] = useState(
    require("../../../../../assets/images/cake1.jpg")
  );

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <View>
      <BackgroundImage
        width={Dimensions.get("window").width}
        height={Dimensions.get("window").height}
        source={cakeBackgroundPath}
      />
      <BackgroundOverlay />
    </View>
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const BackgroundImage = styled(CImage)`
  position: absolute;
`;

const BackgroundOverlay = styled.View<{ theme: ThemeInterface }>`
  position: absolute;
  height: ${Dimensions.get("window").height}px;
  width: ${Dimensions.get("window").width}px;
  background-color: ${(props) => props.theme.colors.primary};
  opacity: 0.8;
`;

export default BackgroundView;

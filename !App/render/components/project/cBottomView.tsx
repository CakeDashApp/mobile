import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import * as Animatable from "react-native-animatable";
import { Dimensions, View } from "react-native";
import { ThemeInterface } from "../../../src/core/controllers/ui/interfaces";

interface Props {
  show: boolean;
  startAnimation?: () => void;
  endAnimation?: () => void;

  // Style
  style?: object;
}

const CBottomView: React.FC<Props> = (props) => {
  // Props
  const { show, children, style } = props;
  const startAnimation = props.startAnimation || (() => {});
  const endAnimation = props.endAnimation || (() => {});

  // Show
  const [showBottom, setShowBottom] = useState<boolean>(show);

  //======================================================================================================================
  // Animation
  //======================================================================================================================

  // Bottom Animation
  const bottomAnimation = useRef<Animatable.View & View>(null);

  useEffect(() => {
    const Animation = async () => {
      startAnimation();
      if (!show) {
        // @ts-ignore
        await bottomAnimation.current?.fadeOutDownBig();
        setShowBottom(false);
      } else {
        setShowBottom(true);
        // @ts-ignore
        await bottomAnimation.current?.fadeInUpBig();
      }
      endAnimation();
    };

    Animation();
  }, [show]);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <Animatable.View
      ref={bottomAnimation}
      style={{ position: "absolute", bottom: 0 }}
    >
      {showBottom && <Container style={style}>{children}</Container>}
    </Animatable.View>
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const Container = styled.View<{ theme: ThemeInterface }>`
  width: ${Dimensions.get("window").width}px;
  background-color: ${(props) => props.theme.colors.surface};
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  padding-top: 50px;
`;

export default CBottomView;

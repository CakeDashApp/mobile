import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import CImage from "../../../../../../../components/default/cImage";
import styled from "styled-components/native";
import * as Animatable from "react-native-animatable";
import { createAnimatableComponent } from "react-native-animatable";
import GoBackButton from "./components/GoBackButton";
import { ImageInterface } from "../../../../../../../../src/core/controllers/image/image.interface";

interface Props {
  show: boolean;
  image: ImageInterface | string | null;
  onClose: () => void;
}

const FullScreenImageModal: React.FC<Props> = (props) => {
  // Props
  const { show, image, onClose } = props;

  // Show
  const [showImage, setShowImage] = useState<boolean>(show);

  //======================================================================================================================
  // Animation
  //======================================================================================================================

  // Bottom Animation
  const bottomAnimation = useRef<Animatable.View & View>(null);

  useEffect(() => {
    const Animation = async () => {
      if (!show) {
        // @ts-ignore
        await bottomAnimation.current?.fadeOutDownBig(200);
        setShowImage(false);
      } else {
        setShowImage(true);
        // @ts-ignore
        await bottomAnimation.current?.fadeInUpBig();
      }
    };

    Animation();
  }, [show]);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <Modal visible={showImage} animationType={"fade"} transparent={true}>
      <Container>
        <TouchableWithoutFeedback onPress={onClose}>
          <Background />
        </TouchableWithoutFeedback>
        <ModalContainer ref={bottomAnimation} animation={"fadeInUpBig"}>
          <CImage
            id={typeof image === "string" ? image : undefined}
            image={typeof image !== "string" ? image : undefined}
            width={"100%"}
            height={"100%"}
            style={{ borderRadius: 10 }}
          />
          <GoBackButton onPress={onClose} />
        </ModalContainer>
      </Container>
    </Modal>
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Background = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.8;
`;

const ModalContainer = createAnimatableComponent(styled.View`
  height: ${Dimensions.get("window").height / 2}px;
  width: ${Dimensions.get("window").width / 1.2}px;
`);

export default FullScreenImageModal;

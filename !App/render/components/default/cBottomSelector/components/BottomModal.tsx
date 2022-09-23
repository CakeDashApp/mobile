import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Dimensions,
  View,
} from "react-native";
import CText from "../../cText";
import styled from "styled-components/native";
import * as Animatable from "react-native-animatable";
import { ItemInterface } from "../controller";
import * as controller from "../controller";
import { ThemeInterface } from "../../../../../src/core/controllers/ui/interfaces";

interface Props {
  show: boolean;
  onClose: () => void;
  onChange: (options: { key: string | number; label: string }) => void;
  items: ItemInterface[];
}

const BottomModal: React.FC<Props> = (props) => {
  // Props
  const { show, onClose, onChange, items } = props;

  // Show Modal
  const [showModal, setShowModal] = useState<boolean>(false);

  //======================================================================================================================
  // Animation
  //======================================================================================================================

  // Modal Animation
  const modalAnimation = useRef<Animatable.View & View>(null);

  useEffect(() => {
    const Animation = async () => {
      if (!show) {
        // @ts-ignore
        await modalAnimation.current?.fadeOutDownBig(500);
        setShowModal(false);
      } else setShowModal(true);
    };

    Animation();
  }, [show]);

  //======================================================================================================================
  // On Item Pressed
  //======================================================================================================================

  const onItemPressed = useCallback((item: ItemInterface) => {
    if (item.key !== controller.CANCEL_KEY)
      onChange({ key: item.key, label: item.label });
    onClose();
  }, []);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <Modal transparent={true} visible={showModal} animationType={"fade"}>
      {/* Background */}
      <TouchableWithoutFeedback onPress={onClose}>
        <Background />
      </TouchableWithoutFeedback>

      {/* 'Modal' */}
      <ModalContainer
        ref={modalAnimation}
        animation={"fadeInUpBig"}
        duration={500}
      >
        {items.map((item) => (
          <TouchableOpacity key={item.key} onPress={() => onItemPressed(item)}>
            <Item>{item.component || <CText>{item.label}</CText>}</Item>
          </TouchableOpacity>
        ))}
      </ModalContainer>
    </Modal>
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const Item = styled.View<{ theme: ThemeInterface }>`
        align-items: center;
        justify-content: center;
        align-self: center;
        background-color: ${(props) => props.theme.colors.on_surface_3}

        margin-top: 10px;
        width: 98%;
        height: 50px;
        border-radius: 10px;
`;

const ModalContainer = Animatable.createAnimatableComponent(styled.View<{
  theme: ThemeInterface;
}>`
  position: absolute;
  bottom: 0;
  width: ${Dimensions.get("window").width - 20}px;
  align-self: center;
  border-radius: 30px;
  margin-bottom: 10px;
  padding: 30px;
  background-color: ${(props) => props.theme.colors.surface};
`);

const Background = styled.View`
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.5;
`;

export default BottomModal;

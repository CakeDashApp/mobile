import React, {useContext, useEffect, useRef, useState} from "react";
import { View } from "react-native";
import CIcon from "../../../assets/icons/cIcon";
import styled from "styled-components/native";
import * as Animatable from "react-native-animatable";
import { iconTypesInterface } from "../../../assets/icons/interface/icon-types.interface";
import ThemeContext from "../../../context/ThemeContext";

interface Props {
  // Button
  onPress: () => void;
  icon: iconTypesInterface;
  show?: boolean;
  disabled?: boolean;

  // Color
  secondary?: boolean;

  // Style
  style?: object;
}

const CBottomButton: React.FC<Props> = (props) => {
  // Props
  const { onPress, secondary, icon, style, disabled } = props;
  const show = props.show !== undefined ? props.show : true;

  // Theme
  const theme = useContext(ThemeContext);

  // Colors
  const iconColor = secondary
    ? theme.colors.on_secondary
    : theme.colors.on_surface;
  const backgroundColor = secondary
    ? theme.colors.secondary
    : theme.colors.on_surface_3;

  // Show
  const [showButton, setShowButton] = useState<boolean>(show);

  //======================================================================================================================
  // Animation
  //======================================================================================================================

  // Button Animation
  const buttonAnimation = useRef<Animatable.View & View>(null);

  useEffect(() => {
    const Animation = async () => {
      if (show) {
        setShowButton(true);
        // @ts-ignore
        await buttonAnimation.current?.bounceIn();
      } else {
        // @ts-ignore
        // await buttonAnimation.current?.bounceOut();
        setShowButton(false);
      }
    };

    Animation();
  }, [show]);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <Animatable.View ref={buttonAnimation} style={[style, theme.shadow]}>
      {showButton && (
        <BottomButton
          onPress={onPress}
          color={backgroundColor}
          disabled={disabled}
        >
          <CIcon type={icon} color={iconColor} size={25} strokeWidth={2} />
        </BottomButton>
      )}
    </Animatable.View>
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const BottomButton = styled.TouchableOpacity<{ color: string }>`
  border-radius: 100px;
  padding: 2px 40px;
  background-color: ${(props) => props.color};
  margin: 5px;
`;

export default CBottomButton;

import React, {useContext, useEffect, useRef} from "react";
import { View } from "react-native";
import CButton from "../default/cButton";
import CText from "../default/cText";
import CIcon from "../../../assets/icons/cIcon";
import styled from "styled-components/native";
import * as Animatable from "react-native-animatable";
import ThemeContext from "../../../context/ThemeContext";

interface ColorInterface {
  selectedColor?: string;
  unselectedColor?: string;
  selectedTextColor?: string;
  unselectedTextColor?: string;
}

interface Props {
  label?: string;
  fontSize?: number;
  icon?: string;
  selected: boolean;
  onPress: () => void;
  color?: ColorInterface;
  shadow?: boolean;
  style?: object;
}

const CTabButton: React.FC<Props> = (props) => {
  // Theme
  const theme = useContext(ThemeContext);

  // Props
  const { selected, onPress, fontSize, style, shadow } = props;
  const color = {
    selectedColor: props.color?.selectedColor || theme.colors.secondary,
    unselectedColor: props.color?.unselectedColor || theme.colors.on_surface_3,
    selectedTextColor:
      props.color?.selectedTextColor || theme.colors.on_secondary,
    unselectedTextColor:
      props.color?.unselectedTextColor || theme.colors.on_surface,
  };
  const icon: string | null = props.icon || null;
  const label: string = props.label || "No Text set!";

  //======================================================================================================================
  // Animation
  //======================================================================================================================

  // Button Animation
  const buttonAnimation = useRef<Animatable.View & View>(null);

  useEffect(() => {
    if (selected) {
      // @ts-ignore
      buttonAnimation.current?.pulse();
    }
  }, [selected]);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <Animatable.View ref={buttonAnimation} style={shadow && theme.shadow}>
      <TabButton
        onPress={onPress}
        color={!selected ? color.unselectedColor : color.selectedColor}
        selected={selected}
        icon={!!icon}
        style={style}
        round
      >
        {!icon ? (
          <CText
            medium={!selected}
            bold={selected}
            size={fontSize}
            color={
              !selected ? color.unselectedTextColor : color.selectedTextColor
            }
          >
            {label}
          </CText>
        ) : (
          <CIcon
            size={25}
            type={icon}
            color={
              !selected ? color.unselectedTextColor : color.selectedTextColor
            }
            strokeWidth={!selected ? 2 : 3}
          />
        )}
      </TabButton>
    </Animatable.View>
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const TabButton = styled(CButton)<{ icon: boolean }>`
  padding: ${(props) => (props.icon ? 8 : 2)}px
    ${(props) => (props.icon ? 8 : 12)}px;
`;

export default CTabButton;

import React, { useCallback, useEffect, useRef } from "react";
import styled from "styled-components/native";
import LinearGradient from "react-native-linear-gradient";
import { Animated } from "react-native";

interface SliderInterface {
  color: string | string[];
  currentValue: number;
}

interface Props {
  endValue: number;
  sliders: SliderInterface[];
  backgroundColor?: string;
  style?: Object;
}

const CSlider: React.FC<Props> = (props) => {
  // Props
  const { endValue, style } = props;
  const backgroundColor = props.backgroundColor || "white";
  const sliders: SliderInterface[] = props.sliders.map((slider) => {
    const newSlider = { ...slider };
    newSlider.color =
      typeof slider.color === "string"
        ? [slider.color, slider.color]
        : slider.color;
    return newSlider;
  });

  //======================================================================================================================
  // Get Last Slider Index
  //======================================================================================================================

  const getLastSliderIndex = useCallback((): number => {
    let index = 0;
    for (let i = 0; i < sliders.length; i++) {
      if (sliders[i].currentValue > 0) index = i;
    }

    return index;
  }, [sliders]);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <Container style={style} backgroundColor={backgroundColor}>
      {sliders.map((slider, index) => {
        // Slider Animation
        const sliderAnimation = useRef(new Animated.Value(0)).current;

        useEffect(() => {
          Animated.timing(sliderAnimation, {
            toValue: slider.currentValue,
            duration: 1000,
            useNativeDriver: false,
          }).start();
        }, [slider.currentValue]);

        const sliderWidth = sliderAnimation.interpolate({
          inputRange: [0, endValue],
          outputRange: ["0%", "100%"],
        });

        return (
          <AnimatedSlider
            colors={slider.color}
            style={{ width: sliderWidth }}
            isLast={getLastSliderIndex() === index}
            key={index}
          />
        );
      })}
    </Container>
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const Container = styled.View<{ backgroundColor: string }>`
  background-color: ${(props) => props.backgroundColor};
  width: 100%;
  height: 20px;
  border-radius: 100px;
  margin-top: 10px;
  overflow: hidden;
  flex-direction: row;
`;

const AnimatedSlider = Animated.createAnimatedComponent(styled(LinearGradient)<{
  isLast: boolean;
}>`
  height: 100%;
  border-bottom-right-radius: ${(props) => (props.isLast ? 100 : 0)}px;
  border-top-right-radius: ${(props) => (props.isLast ? 100 : 0)}px;
`);

export default CSlider;

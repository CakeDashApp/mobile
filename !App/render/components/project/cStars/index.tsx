import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import { TouchableWithoutFeedback, Animated, Easing } from "react-native";
import Star from "./components/Star";

interface Props {
  starCount?: number;
  rating: number;
  size?: number;
  color?: {
    color?: string;
    borderColor?: string;
  };
  onRate?: (rating: number) => void;
  canRate?: boolean;
}

const CStars: React.FC<Props> = (props) => {
  // Props
  const { color, size, canRate, rating } = props;
  const onRate = props.onRate || (() => {});
  const starCount = props.starCount || 5;
  const [_rating, setRating] = useState<number>(rating);

  //======================================================================================================================
  // Animation
  //======================================================================================================================

  const starAnimation = useRef(new Animated.Value(0)).current;

  const animateRating = () => {
    Animated.timing(starAnimation, {
      toValue: 1,
      duration: 400,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      starAnimation.setValue(0);
    });
  };

  const animateScale = starAnimation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.4, 1],
  });

  const animateOpacity = starAnimation.interpolate({
    inputRange: [0, 0.2, 1],
    outputRange: [1, 0.5, 1],
  });

  const animateWobble = starAnimation.interpolate({
    inputRange: [0, 0.25, 0.75, 1],
    outputRange: ["0deg", "-3deg", "3deg", "0deg"],
  });

  useEffect(() => {
    setRating(rating);

    animateRating();
  }, [rating]);

  //======================================================================================================================
  // On Rate
  //======================================================================================================================

  const _onRate = useCallback((rating: number) => {
    onRate(rating);
    setRating(rating);

    // Animation
    animateRating();
  }, []);

  //======================================================================================================================
  // Render Stars
  //======================================================================================================================

  const renderStars = () => {
    const stars = [];

    const animationStyle = {
      transform: [{ scale: animateScale }, { rotate: animateWobble }],
      opacity: animateOpacity,
    };

    for (let i = 1; i < starCount + 1; i++) {
      stars.push(
        <TouchableWithoutFeedback
          key={i}
          onPress={() => _onRate(i)}
          disabled={!canRate}
        >
          <Animated.View style={i <= _rating && animationStyle}>
            <Star size={size} color={color} filled={i <= _rating} />
          </Animated.View>
        </TouchableWithoutFeedback>
      );
    }

    return stars;
  };

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return <Container>{renderStars()}</Container>;
};

//======================================================================================================================
// Styles
//======================================================================================================================

const Container = styled.View`
  flex-direction: row;
`;

export default CStars;

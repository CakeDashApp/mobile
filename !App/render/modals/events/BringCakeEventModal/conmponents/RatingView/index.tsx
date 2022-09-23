import React, {useCallback, useContext, useEffect, useRef, useState} from "react";
import styled from "styled-components/native";
import CText from "../../../../../components/default/cText";
import core from "../../../../../../src/core";
import strings from "./strings";
import CStars from "../../../../../components/project/cStars";
import * as Animatable from "react-native-animatable";
import { View } from "react-native";
import { ThemeInterface } from "../../../../../../src/core/controllers/ui/interfaces";
import ThemeContext from "../../../../../../context/ThemeContext";

interface Props {
  onRate: (rating: number) => void;
  show: boolean;
}

const VoteView: React.FC<Props> = (props) => {
  // Props
  const { onRate, show } = props;

  // Theme
  const theme = useContext(ThemeContext);

  // show
  const [showRating, setShowRating] = useState<boolean>(show);

  //======================================================================================================================
  // Animation
  //======================================================================================================================

  // Vote Animation
  const ratingAnimation = useRef<Animatable.View & View>(null);

  useEffect(() => {
    const Animation = async () => {
      if (show) {
        setShowRating(true);
        // @ts-ignore
        await ratingAnimation.current?.bounceIn();
      } else {
        // @ts-ignore
        await ratingAnimation.current?.bounceOut();
        setShowRating(false);
      }
    };

    Animation();
  }, [show]);

  //======================================================================================================================
  // On Rate
  //======================================================================================================================

  const _onRate = useCallback(
    async (rating: number) => {
      // Await animation
      await core.helper.date.sleep(500);

      onRate(rating);
    },
    [onRate]
  );

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <Animatable.View ref={ratingAnimation}>
      {showRating && (
        <Container>
          <TextContainer>
            <CText color={theme.colors.on_surface} size={20} bold>
              {strings().rateTitle}
            </CText>
            <CText color={theme.colors.on_surface_2} size={12} bold>
              {strings().rateSubTitle}
            </CText>
          </TextContainer>
          <StarContainer>
            <CStars
              rating={0}
              onRate={_onRate}
              canRate={true}
              size={30}
              color={{ borderColor: theme.colors.on_surface }}
            />
          </StarContainer>
        </Container>
      )}
    </Animatable.View>
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const Container = styled.View<{ theme: ThemeInterface }>`
  background-color: ${(props) => props.theme.colors.surface};
`;

const StarContainer = styled.View`
  flex-direction: row;
  margin-top: 5px;
`;

const TextContainer = styled.View`
  margin-top: 20px;
`;

export default VoteView;

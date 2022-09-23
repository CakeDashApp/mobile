import React, {useContext, useEffect, useRef, useState} from "react";
import styled from "styled-components/native";
import VoteButton from "./components/VoteButton";
import CText from "../../../../../components/default/cText";
import strings from "./strings";
import * as Animatable from "react-native-animatable";
import { View } from "react-native";
import { ThemeInterface } from "../../../../../../src/core/controllers/ui/interfaces";
import ThemeContext from "../../../../../../context/ThemeContext";

interface Props {
  onConfirm: () => void;
  onReject: () => void;
  show: boolean;
}

const VoteView: React.FC<Props> = (props) => {
  // Props
  const { onConfirm, onReject, show } = props;

  // Theme
  const theme = useContext(ThemeContext);

  // Show
  const [showVote, setShowVote] = useState<boolean>(show);

  //======================================================================================================================
  // Animation
  //======================================================================================================================

  // Vote Animation
  const voteAnimation = useRef<Animatable.View & View>(null);

  useEffect(() => {
    const Animation = async () => {
      if (show) {
        setShowVote(true);
        // @ts-ignore
        await voteAnimation.current?.bounceIn();
      } else {
        // @ts-ignore
        await voteAnimation.current?.bounceOut();
        setShowVote(false);
      }
    };

    Animation();
  }, [show]);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <Animatable.View ref={voteAnimation}>
      {showVote && (
        <Container>
          <TextContainer>
            <CText color={theme.colors.on_surface} size={20} bold>
              {strings().voteTitle}
            </CText>
            <CText color={theme.colors.on_surface_2} size={12} bold>
              {strings().voteSubTitle}
            </CText>
          </TextContainer>
          <ButtonContainer>
            <VoteButton confirm={true} onPress={onConfirm} />
            <VoteButton confirm={false} onPress={onReject} />
          </ButtonContainer>
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

const ButtonContainer = styled.View`
  flex-direction: row;
  margin-top: 20px;
`;

const TextContainer = styled.View`
  margin-top: 20px;
`;

export default VoteView;

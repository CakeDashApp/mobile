import React, {useContext, useEffect, useRef, useState} from "react";
import CRefresh from "./cRefresh";
import CText from "../default/cText";
import styled from "styled-components/native";
import * as Animatable from "react-native-animatable";
import { View } from "react-native";
import { ThemeInterface } from "../../../src/core/controllers/ui/interfaces";
import ThemeContext from "../../../context/ThemeContext";

interface InfoInterface {
  text: string;
  color?: string;
}

interface CTopInfoProps {
  loading?: boolean;
  info?: InfoInterface;
  fadeOut?: number;

  //Position
  top?: number;

  //Style
  style?: object;
}

const CTopInfo: React.FC<CTopInfoProps> = (props) => {
  // Props
  const { loading, info, style, fadeOut } = props;
  const top = props.top || 30;

  // Theme
  const theme = useContext(ThemeContext);

  // Info
  const [showInfo, setShowInfo] = useState<boolean>(info !== undefined);

  // Loading
  const [showLoading, setShowLoading] = useState<boolean>(loading || false);

  //======================================================================================================================
  // Animation
  //======================================================================================================================

  // Info Animation
  const infoAnimation = useRef<Animatable.View & View>(null);

  useEffect(() => {
    const Animation = async () => {
      if (info) {
        setShowInfo(true);
        // @ts-ignore
        await infoAnimation.current?.bounceIn();

        // Fade Out
        if (fadeOut)
          await setTimeout(async () => {
            // @ts-ignore
            await infoAnimation.current?.fadeOut();
            setShowInfo(false);
          }, fadeOut);
      } else {
        // @ts-ignore
        await infoAnimation.current?.bounceOut();
        setShowInfo(false);
      }
    };

    Animation();
  }, [info]);

  // Loading Animation
  const loadingAnimation = useRef<Animatable.View & View>(null);

  useEffect(() => {
    const Animation = async () => {
      if (loading) {
        setShowLoading(true);
        // @ts-ignore
        await loadingAnimation.current.bounceIn();
      } else {
        // @ts-ignore
        await loadingAnimation.current.bounceOut();
        setShowLoading(false);
      }
    };

    Animation();
  }, [loading]);

  //======================================================================================================================
  // Render Info
  //======================================================================================================================

  const Info = (props: { show: boolean }) => {
    return (
      <Animatable.View ref={infoAnimation}>
        {props.show && (
          <InfoContainer
            color={info?.color || theme.colors.secondary}
            style={[style, theme.shadow]}
          >
            <CText bold color={theme.colors.on_error}>
              {info?.text || ""}
            </CText>
          </InfoContainer>
        )}
      </Animatable.View>
    );
  };

  //======================================================================================================================
  // Render Loading
  //======================================================================================================================

  const Loading = (props: { show: boolean }) => {
    return (
      <Animatable.View ref={loadingAnimation}>
        {props.show && (
          <LoadingContainer style={[style, theme.shadow]}>
            <CRefresh color={theme.colors.on_primary} />
          </LoadingContainer>
        )}
      </Animatable.View>
    );
  };

  //======================================================================================================================
  //Render
  //======================================================================================================================

  return (
    <Container top={top}>
      <Loading show={showLoading} />
      <Info show={showInfo} />
    </Container>
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const Container = styled.View<{ top: number }>`
  position: absolute;
  top: ${(props) => props.top}px;
  align-self: center;
`;

const LoadingContainer = styled.View<{ theme: ThemeInterface }>`
  padding: 5px;
  border-radius: 100px;
  width: 40px;
  height: 40px;
  background-color: ${(props) => props.theme.colors.primary};
`;

const InfoContainer = styled.View<{ color: string }>`
  padding: 5px;
  border-radius: 10px;
  opacity: 0.8;
  background-color: ${(props) => props.color};
`;

export default CTopInfo;

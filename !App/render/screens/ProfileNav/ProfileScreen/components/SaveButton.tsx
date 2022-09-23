import React, {useContext, useEffect, useRef, useState} from "react";
import CButton from "../../../../components/default/cButton";
import CIcon from "../../../../../assets/icons/cIcon";
import CRefresh from "../../../../components/project/cRefresh";
import * as Animatable from "react-native-animatable";
import { SafeAreaView, View } from "react-native";
import styled from "styled-components/native";
import ThemeContext from "../../../../../context/ThemeContext";

interface Props {
  onPress: () => void;
  isLoading: boolean;
  show: boolean;
}

const SaveButton: React.FC<Props> = (props) => {
  // Props
  const { onPress, isLoading, show } = props;

  // Theme
  const theme = useContext(ThemeContext);

  // Show
  const [showButton, setShowButton] = useState<boolean>(show);

  //======================================================================================================================
  // Animation
  //======================================================================================================================

  // Loading Animation
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
    <SafeAreaView style={{backgroundColor: theme.colors.background}}>
      <AnimatedContainer ref={buttonAnimation} style={theme.shadow}>
        {showButton && (
          <CButton
            onPress={onPress}
            round
            shadow
            color={[theme.colors.secondary, theme.colors.secondary_2]}
            disabledColor={[theme.colors.secondary, theme.colors.secondary_2]}
            disabled={isLoading}
            width={70}
            height={70}
          >
            {!isLoading ? (
              <CIcon
                type={"save"}
                color={theme.colors.on_secondary}
                size={30}
              />
            ) : (
              <CRefresh color={theme.colors.on_secondary} />
            )}
          </CButton>
        )}
      </AnimatedContainer>
    </SafeAreaView>
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const AnimatedContainer = Animatable.createAnimatableComponent(styled.View`
  position: relative;
  align-self: flex-end;
  bottom: 60px;
  margin: 10px;
`);

export default SaveButton;

import React, { useCallback, useRef } from "react";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Animatable from "react-native-animatable";
import styled from "styled-components/native";
import CText from "../../../../render/components/default/cText";
import CIcon from "../../../../assets/icons/cIcon";
import CImage from "../../../../render/components/default/cImage";

interface Props {
  // Tab
  isActive: boolean;
  onPress: () => void;
  activeText: string;

  // Color
  activeColor: string;
  inactiveColor: string;
  backgroundColor: string;

  // Icon
  imageId: string | undefined;
  icon: string | undefined;
  iconSize: number;
}

const Tab: React.FC<Props> = (props) => {
  // Props
  const {
    isActive,
    onPress,
    activeColor,
    inactiveColor,
    activeText,
    icon,
    backgroundColor,
    imageId,
  } = props;
  const iconSize = isActive ? props.iconSize - 5 : props.iconSize;

  //Animation
  const tabAnimation = useRef<Animatable.View & View>(null);

  //========================================================================================================================
  // On Press
  //========================================================================================================================

  const _onPress = useCallback(() => {
    onPress();

    // @ts-ignore
    tabAnimation.current?.pulse(1000);
  }, [tabAnimation, onPress]);

  //========================================================================================================================
  // Render
  //========================================================================================================================

  return (
    <Container ref={tabAnimation} animation={"bounceIn"}>
      <TouchableOpacity onPress={_onPress}>
        <TabContainer>
          {icon && (
            <CIcon
              type={icon}
              fill={isActive}
              color={isActive ? activeColor : inactiveColor}
              size={iconSize}
              backgroundColor={backgroundColor}
            />
          )}
          {imageId && (
            <CImage id={imageId} height={iconSize} width={iconSize} round />
          )}
          {isActive && (
            <TabName size={10} color={activeColor} bold>
              {activeText}
            </TabName>
          )}
        </TabContainer>
      </TouchableOpacity>
    </Container>
  );
};

//========================================================================================================================
// Styles
//========================================================================================================================

const TabContainer = styled.View`
  padding: 5px;
  align-items: center;
  justify-content: center;
`;

const TabName = styled(CText)`
  margin-top: 3px;
`;

const Container = Animatable.createAnimatableComponent(styled.View`
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
`);

export default Tab;

import React, {useContext, useEffect, useRef, useState} from "react";
import {
  Dimensions,
  ScrollView,
  Animated,
  Platform,
  TouchableOpacity,
  View,
} from "react-native";
import styled from "styled-components/native";
import * as Animatable from "react-native-animatable";
import CText from "../default/cText";
import CIcon from "../../../assets/icons/cIcon";
import core from "../../../src/core";
import CBottomButton from "./cBottomButton";
import CRefresh from "./cRefresh";
import { iconTypesInterface } from "../../../assets/icons/interface/icon-types.interface";
import { useAgile } from "@agile-ts/react";
import { ThemeInterface } from "../../../src/core/controllers/ui/interfaces";
import ThemeContext from "../../../context/ThemeContext";

interface SectionInterface {
  key: string | number;
  name?: string;
  icon?: {
    type: iconTypesInterface;
    iconStroke?: number;
    iconSize?: number;
  };
  color?: string;
  nameInfo?: string;
  content: React.ReactNode;
}

type BackButtonIconInterface =
  | "chevronLeft"
  | "chevronRight"
  | "chevronUp"
  | "chevronDown";

interface Props {
  // Sections
  sections: SectionInterface[];
  scrollView?: boolean;
  isLoading?: boolean;
  fullScreenIsLoading?: boolean; // TODO currently getting error if I am trying to add this feature
  showChevrons?: boolean;
  showSections?: (string | number)[];
  flex?: number;

  // Bottom Buttons
  backButton?: boolean;
  backButtonIcon?: BackButtonIconInterface;
  onGoBack?: () => void;
  submitButton?: boolean;
  onSubmit?: () => void;
  bottomButtons?: React.ReactNode[];
}

const CSectionModal: React.FC<Props> = (props) => {
  // Props
  const {
    sections,
    isLoading,
    showSections,
    fullScreenIsLoading,
    flex,
  } = props;
  const bottomButtons = props.bottomButtons || [];
  const backButton: boolean =
    props.backButton !== undefined ? props.backButton : true;
  const backButtonIcon: BackButtonIconInterface =
    props.backButtonIcon || "chevronLeft";
  const onGoBack = props.onGoBack || (() => {});
  const submitButton: boolean = props.submitButton || false;
  const onSubmit = props.onSubmit || (() => {});
  const scrollView: boolean =
    props.scrollView !== undefined ? props.scrollView : true;
  const showChevrons: boolean = props.showChevrons || false;

  // Theme
  const theme = useContext(ThemeContext);

  // Keyboard
  const keyboardIsVisible = useAgile(core.ui.KEYBOARD_IS_VISIBLE);
  const keyBoardHeight = useAgile(core.ui.KEYBOARD_HEIGHT);

  //======================================================================================================================
  // Animation
  //======================================================================================================================

  // Input Animation
  const inputAnimation = useRef(new Animated.Value(0)).current;

  const moveUp = () => {
    Animated.timing(inputAnimation, {
      toValue: 1,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  const moveDown = () => {
    Animated.timing(inputAnimation, {
      toValue: 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  const bottomAnimation = inputAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [40, keyBoardHeight + (Platform.OS === "android" ? 80 : 40)],
  });

  useEffect(() => {
    if (keyboardIsVisible) moveUp();
    else moveDown();
  }, [keyboardIsVisible]);

  //======================================================================================================================
  // Render Item
  // Why no making it as component? Read: https://stackoverflow.com/questions/59891992/keyboard-dismisses-while-typing-textinput-in-nested-functional-component-react-n
  //======================================================================================================================

  const renderItem = (item: SectionInterface) => {
    // For Chevron Feature
    const [isOpen, setIsOpen] = useState<boolean>(true);

    // For Show Sections Feature
    if (showSections && !showSections.includes(item.key)) return;

    return (
      <ItemContainer key={item.key}>
        {(item.name || item.icon) && (
          <Header>
            <RightItemsContainer>
              {item.icon && (
                <LeftIcon
                  size={item.icon.iconSize || 25}
                  type={item.icon.type}
                  color={item.color || theme.colors.on_surface}
                  strokeWidth={item.icon.iconStroke}
                />
              )}
              <CText
                bold
                size={30}
                color={item.color || theme.colors.on_surface}
              >
                {item.name}
              </CText>
              {item.nameInfo && (
                <NameInfoText bold size={12} color={theme.colors.on_surface_2}>
                  {item.nameInfo}
                </NameInfoText>
              )}
            </RightItemsContainer>
            {showChevrons && (
              <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
                <RightIconContainer>
                  <CIcon
                    type={isOpen ? "chevronUp" : "chevronDown"}
                    color={theme.colors.on_surface}
                  />
                </RightIconContainer>
              </TouchableOpacity>
            )}
          </Header>
        )}
        {isOpen && item.content}
      </ItemContainer>
    );
  };

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <Container>
      {scrollView ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={flex ? { flex: flex } : undefined}
        >
          <ScrollViewContentContainer>
            {sections.map((item) => renderItem(item))}
          </ScrollViewContentContainer>
        </ScrollView>
      ) : (
        <View style={{ flex: 1 }}>
          {sections.map((item) => renderItem(item))}
        </View>
      )}
      <AnimatedBottomContainer style={{ bottom: bottomAnimation }}>
        {isLoading && (
          <RefreshContainer style={theme.shadow} animation={"bounceInDown"}>
            <CRefresh size={25} />
          </RefreshContainer>
        )}
        <CBottomButton
          onPress={onGoBack}
          icon={backButtonIcon}
          show={backButton && !isLoading}
        />
        <CBottomButton
          onPress={onSubmit}
          icon={"check"}
          secondary
          show={submitButton && !isLoading}
        />
        {bottomButtons.map((button, index) => (
          <View key={index}>{button}</View>
        ))}
      </AnimatedBottomContainer>
    </Container>
  );
};

//======================================================================================================================
//Styles
//======================================================================================================================

const Container = styled.View<{ theme: ThemeInterface }>`
  flex: 1;
  padding: 30px 20px 0 20px;
  background-color: ${(props) => props.theme.colors.surface};
`;

const ItemContainer = styled.View`
  margin-bottom: 20px;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
  justify-content: space-between;
`;

const RightItemsContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const NameInfoText = styled(CText)`
  align-self: flex-end;
  margin-bottom: 5px;
  margin-left: 8px;
`;

const LeftIcon = styled(CIcon)`
  margin-right: 5px;
`;

const RightIconContainer = styled.View`
  margin-right: 5px;
`;

const AnimatedBottomContainer = Animated.createAnimatedComponent(styled.View`
  position: absolute;
  width: ${Dimensions.get("window").width}px;
  flex-direction: row;
  justify-content: center;
`);

const RefreshContainer = Animatable.createAnimatableComponent(styled.View<{
  theme: ThemeInterface;
}>`
  position: absolute;
  bottom: 0;
  width: 40px;
  height: 40px;
  background-color: ${(props) => props.theme.colors.on_surface_3};
  border-radius: 100px;
  align-items: center;
  justify-content: center;
`);

const ScrollViewContentContainer = styled.View`
  margin-bottom: 100px;
`;

export default CSectionModal;

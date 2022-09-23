import React, {ReactElement, useCallback, useContext, useEffect} from "react";
import { Dimensions, Platform, Animated } from "react-native";
import styled from "styled-components/native";
import CText from "../../../render/components/default/cText";
import core from "../../../src/core";
import CIcon from "../../../assets/icons/cIcon";
import { TouchableOpacity } from "react-native-gesture-handler";
import ThemeContext from "../../../context/ThemeContext";

interface Props {
  // Navigation
  state: any;
  descriptors: any;
  navigation: any;

  // Colors
  color?: string;
  backgroundColor?: string | Animated.Value;
  shadow?: boolean;

  // Other
  title?: string;
  backArrow?: boolean;
  onTitlePressed?: () => void;
  rightElement?: ReactElement;
  children?: ReactElement;
  absolute?: boolean;
}

const Headerbar: React.FC<Props> = (props) => {
  // Props
  const {
    state,
    descriptors,
    navigation,
    rightElement,
    children,
    shadow,
    title,
    absolute,
    backgroundColor,
  } = props;
  const onTitlePressed = props.onTitlePressed || (() => {});
  const backArrow = props.backArrow && navigation.canGoBack();

  // Theme
  const theme = useContext(ThemeContext);

  // Color
  const color: string = props.color || theme.colors.on_primary;

  // Height
  const height =
    Dimensions.get("window").height / (Platform.OS === "android" ? 11 : 8.5);
  useEffect(() => {
    core.ui.setHeaderHeight(height);
  }, [height]);

  //========================================================================================================================
  // On Go Back
  //========================================================================================================================

  const onGoBack = useCallback(() => {
    if (navigation.canGoBack()) navigation.goBack();
  }, [navigation]);

  //========================================================================================================================
  // Render Back Arrow
  //========================================================================================================================

  const BackArrow = () => {
    return (
      <BackArrowContainer>
        <TouchableOpacity onPress={onGoBack}>
          <CIcon type={"chevronLeft"} color={color} size={45} />
        </TouchableOpacity>
      </BackArrowContainer>
    );
  };

  //========================================================================================================================
  // Render Title
  //========================================================================================================================

  const Title = () => {
    return (
      <TitleContainer>
        <TouchableOpacity
          onPress={onTitlePressed}
          disabled={!props.onTitlePressed}
        >
          <CText bold color={color} size={40}>
            {title}
          </CText>
        </TouchableOpacity>
      </TitleContainer>
    );
  };

  //========================================================================================================================
  // Render Right Element
  //========================================================================================================================

  const RightElement = () => {
    return <RightElementContainer>{rightElement}</RightElementContainer>;
  };

  //========================================================================================================================
  // Render
  //========================================================================================================================

  return (
    <Container
      absolute={absolute || false}
      style={[shadow && theme.shadow, { backgroundColor: backgroundColor }]}
      height={height}
    >
      <ContentContainer>
        {backArrow && <BackArrow />}
        {title && <Title />}
        {children}
        {rightElement && <RightElement />}
      </ContentContainer>
    </Container>
  );
};

//========================================================================================================================
// Styles
//========================================================================================================================

const Container = Animated.createAnimatedComponent(styled.SafeAreaView<{
  absolute: boolean;
  height: number;
}>`
  position: ${(props) => (props.absolute ? "absolute" : "relative")};
  left: 0;
  top: 0;
  width: 100%;
  height: ${(props) => props.height}px;
`);

const ContentContainer = styled.View`
  flex-direction: row;
  margin: 0 10px;
`;

const BackArrowContainer = styled.View`
  flex: 1;
  height: 100%;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
`;

const TitleContainer = styled.View`
  flex: 10;
  height: 100%;
  align-items: flex-start;
  justify-content: center;
`;

const RightElementContainer = styled.View`
  flex: 1;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export default Headerbar;

import React, {useContext} from "react";
import CBottomView from "../../../../../components/project/cBottomView";
import CText from "../../../../../components/default/cText";
import strings from "../../strings";
import styled from "styled-components/native";
import GetStartedButton from "./components/GetStartedButton";
import SignInButton from "./components/SignInButton";
import ThemeContext from "../../../../../../context/ThemeContext";

interface Props {
  onGoSignIn: () => void;
  onGoSignUp: () => void;
}

const StartView: React.FC<Props> = (props) => {
  // Props
  const { onGoSignUp, onGoSignIn } = props;

  // Theme
  const theme = useContext(ThemeContext);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <Container>
      <StartViewContainer show={true}>
        <TextContainer>
          <CText bold size={30} color={theme.colors.on_surface}>
            {strings().footerTitle}
          </CText>
          <SignInButton onPress={onGoSignIn} />
        </TextContainer>
        <GetStartedButton onPress={onGoSignUp} />
      </StartViewContainer>
    </Container>
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const Container = styled.View`
  flex: 2;
`;

const TextContainer = styled.View`
  margin-bottom: 30px;
`;

const StartViewContainer = styled(CBottomView)`
  height: 100%;
  justify-content: space-between;
  padding-left: 30px;
  padding-right: 30px;
`;

export default StartView;

import React, {useContext} from "react";
import CText from "../../../../../../components/default/cText";
import strings from "../../../strings";
import CIcon from "../../../../../../../assets/icons/cIcon";
import styled from "styled-components/native";
import CButton from "../../../../../../components/default/cButton";
import ThemeContext from "../../../../../../../context/ThemeContext";

interface Props {
  onPress: () => void;
}

const GetStartedButton: React.FC<Props> = (props) => {
  // Props
  const { onPress } = props;

  // Theme
  const theme = useContext(ThemeContext);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <ButtonContainer>
      <Button
        onPress={onPress}
        color={[theme.colors.secondary, theme.colors.secondary_2]}
        round
        row
      >
        <CText bold size={16} color={theme.colors.on_secondary}>
          {strings().getStartedButtonText}
        </CText>
        <CIcon
          type={"chevronRight"}
          color={theme.colors.on_secondary}
          size={20}
        />
      </Button>
    </ButtonContainer>
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const ButtonContainer = styled.View`
  align-self: flex-end;
  margin-bottom: 50px;
`;

const Button = styled(CButton)`
  padding: 10px 20px 10px 20px;
`;

export default GetStartedButton;

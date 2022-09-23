import React, {useContext} from "react";
import CText from "../../../../../../../../../../components/default/cText";
import styled from "styled-components/native";
import CButton from "../../../../../../../../../../components/default/cButton";
import strings from "../../../strings";
import ThemeContext from "../../../../../../../../../../../context/ThemeContext";

interface Props {
  onPress: () => void;
}

const AddButton: React.FC<Props> = (props) => {
  // Props
  const { onPress } = props;

  // Theme
  const theme = useContext(ThemeContext);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <Button onPress={onPress} color={theme.colors.secondary} round>
      <CText bold color={theme.colors.on_secondary}>
        {strings().addButtonText}
      </CText>
    </Button>
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const Button = styled(CButton)`
  padding: 10px 30px;
`;

export default AddButton;

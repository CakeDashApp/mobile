import React, {useContext} from "react";
import CIcon from "../../../../../../../../../../../assets/icons/cIcon";
import styled from "styled-components/native";
import CButton from "../../../../../../../../../../components/default/cButton";
import ThemeContext from "../../../../../../../../../../../context/ThemeContext";

interface Props {
  onPress: () => void;
}

const DeleteButton: React.FC<Props> = (props) => {
  // Props
  const { onPress } = props;

  // Theme
  const theme = useContext(ThemeContext);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <ButtonContainer onPress={onPress}>
      <CIcon type={"trash"} color={theme.colors.error} />
    </ButtonContainer>
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const ButtonContainer = styled(CButton)`
  margin-right: 20px;
`;

export default DeleteButton;

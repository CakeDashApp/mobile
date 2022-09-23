import React, {useContext} from "react";
import CIcon from "../../../../../../../assets/icons/cIcon";
import styled from "styled-components/native";
import ThemeContext from "../../../../../../../context/ThemeContext";

interface Props {
  confirm: boolean;
  onPress: (confirm: boolean) => void;
}

const VoteButton: React.FC<Props> = (props) => {
  // Props
  const { confirm, onPress } = props;

  // Theme
  const theme = useContext(ThemeContext);

  // Color
  const color = confirm ? "#5DB8FE" : "#E55D5D";

  // Icon
  const icon = confirm ? "check" : "cross";

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <Button onPress={() => onPress(confirm)} color={color} style={theme.shadow}>
      <CIcon type={icon} color={"#ffffff"} strokeWidth={2} size={30} />
    </Button>
  );
};

const Button = styled.TouchableOpacity<{ color: string }>`
  border-radius: 10px;
  padding: 7px 40px;
  background-color: ${(props) => props.color};
  margin-right: 20px;
`;

export default VoteButton;

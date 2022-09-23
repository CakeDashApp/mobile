import React, { useContext } from "react";
import CButton from "../../../../../../components/default/cButton";
import CText from "../../../../../../components/default/cText";
import ThemeContext from "../../../../../../../context/ThemeContext";

interface Props {
  color: string;
  label: string;
  onPress: () => void;
}

const ProfileButton: React.FC<Props> = (props) => {
  // Props
  const { color, label, onPress } = props;

  // Theme
  const theme = useContext(ThemeContext);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <CButton onPress={onPress} color={color} width={"50%"} padding={10}>
      <CText bold color={theme.colors.on_secondary}>
        {label}
      </CText>
    </CButton>
  );
};

export default ProfileButton;

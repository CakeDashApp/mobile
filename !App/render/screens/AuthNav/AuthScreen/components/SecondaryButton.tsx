import React, {useContext} from "react";
import CButton from "../../../../components/default/cButton";
import CText from "../../../../components/default/cText";
import ThemeContext from "../../../../../context/ThemeContext";

interface Props {
  label: string;
  onPress: () => void;
  disabled?: boolean;
}

const SecondaryButton: React.FC<Props> = (props) => {
  // Props
  const { label, onPress, disabled } = props;

  // Theme
  const theme = useContext(ThemeContext);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <CButton
      border
      borderColor={theme.colors.secondary}
      borderDisabledColor={theme.colors.secondary}
      borderWidth={2}
      radius={10}
      width={"100%"}
      height={60}
      onPress={onPress}
      disabled={disabled}
    >
      <CText bold color={theme.colors.secondary} size={18}>
        {label}
      </CText>
    </CButton>
  );
};

export default SecondaryButton;

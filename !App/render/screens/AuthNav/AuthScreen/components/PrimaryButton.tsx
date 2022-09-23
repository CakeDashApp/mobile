import React, {useContext} from "react";
import CButton from "../../../../components/default/cButton";
import CText from "../../../../components/default/cText";
import CRefresh from "../../../../components/project/cRefresh";
import ThemeContext from "../../../../../context/ThemeContext";

interface Props {
  label: string;
  onPress: () => void;
  isLoading: boolean;
  disabled?: boolean;
}

const PrimaryButton: React.FC<Props> = (props) => {
  // Props
  const { label, onPress, isLoading, disabled } = props;

  // Theme
  const theme = useContext(ThemeContext);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <CButton
      color={[theme.colors.secondary, theme.colors.secondary_2]}
      disabledColor={[theme.colors.secondary, theme.colors.secondary_2]}
      radius={10}
      width={"100%"}
      height={60}
      row
      disabled={isLoading || disabled}
      onPress={onPress}
    >
      {!isLoading ? (
        <CText bold color={theme.colors.on_secondary} size={18}>
          {label}
        </CText>
      ) : (
        <CRefresh color={theme.colors.on_secondary} size={30} />
      )}
    </CButton>
  );
};

export default PrimaryButton;

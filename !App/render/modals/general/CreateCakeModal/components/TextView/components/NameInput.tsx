import React, {useContext} from "react";
import styled from "styled-components/native";
import strings from "../strings";
import * as controller from "../../../controller";
import CInput from "../../../../../../components/default/cInput";
import ThemeContext from "../../../../../../../context/ThemeContext";

interface Props {
  showInputError: boolean;
  onFocus: () => void;
  onBlur: () => void;
}

const NameInput: React.FC<Props> = (props) => {
  // Props
  const { showInputError, onBlur, onFocus } = props;

  // Theme
  const theme = useContext(ThemeContext);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <Input
      title={strings().nameInputText}
      initialValue={controller.CakeEditor.getOriginalValue("name")}
      onValueUpdate={(value: string) =>
        controller.CakeEditor.setValue("name", value)
      }
      error={controller.CakeEditor.getErrorStatus("name")}
      success={controller.CakeEditor.getSuccessStatus("name")}
      statusMessage={controller.CakeEditor.getStatusMessage("name")}
      showError={showInputError}
      clearable
      onClear={() => controller.CakeEditor.resetValue("name")}
      color={{
        changedColor: theme.colors.secondary,
        backgroundColor: theme.colors.surface,
        inputColor: theme.colors.on_surface,
        errorColor: theme.colors.error,
      }}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const Input = styled(CInput)`
  margin-bottom: 5px;
`;

export default NameInput;

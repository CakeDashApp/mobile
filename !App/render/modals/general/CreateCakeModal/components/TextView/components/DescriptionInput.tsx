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

const DescriptionInput: React.FC<Props> = (props) => {
  // Props
  const { showInputError, onBlur, onFocus } = props;

  // Theme
  const theme = useContext(ThemeContext);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <Input
      title={strings().descriptionInputText}
      initialValue={controller.CakeEditor.getOriginalValue("description")}
      onValueUpdate={(value: string) =>
        controller.CakeEditor.setValue("description", value)
      }
      error={controller.CakeEditor.getErrorStatus("description")}
      success={controller.CakeEditor.getSuccessStatus("description")}
      statusMessage={controller.CakeEditor.getStatusMessage("description")}
      showError={showInputError}
      clearable
      onClear={() => controller.CakeEditor.resetValue("description")}
      color={{
        changedColor: theme.colors.secondary,
        backgroundColor: theme.colors.surface,
        inputColor: theme.colors.on_surface,
        errorColor: theme.colors.error,
      }}
      onFocus={onFocus}
      onBlur={onBlur}
      multiline
      maxLength={100}
    />
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const Input = styled(CInput)`
  margin-bottom: 5px;
  max-height: 150px;
`;

export default DescriptionInput;

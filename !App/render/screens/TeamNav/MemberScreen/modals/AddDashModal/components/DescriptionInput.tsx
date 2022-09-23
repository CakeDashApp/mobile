import React, {useContext} from "react";
import styled from "styled-components/native";
import * as controller from "../controller";
import CInput from "../../../../../../components/default/cInput";
import strings from "../strings";
import ThemeContext from "../../../../../../../context/ThemeContext";

interface Props {
  showInputError: boolean;
}

const DescriptionInput: React.FC<Props> = (props) => {
  // Props
  const { showInputError } = props;

  // Theme
  const theme = useContext(ThemeContext);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <Input
      title={strings().descriptionInputLabel}
      initialValue={controller.AddDashEditor.getOriginalValue("description")}
      onValueUpdate={(value: string) =>
        controller.AddDashEditor.setValue("description", value)
      }
      error={controller.AddDashEditor.getErrorStatus("description")}
      success={controller.AddDashEditor.getSuccessStatus("description")}
      statusMessage={controller.AddDashEditor.getStatusMessage("description")}
      showError={showInputError}
      clearable
      onClear={() => controller.AddDashEditor.resetValue("description")}
      color={{
        changedColor: theme.colors.secondary,
        backgroundColor: theme.colors.surface,
        inputColor: theme.colors.on_surface,
        errorColor: theme.colors.error,
      }}
      multiline
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

import React, {useContext} from "react";
import styled from "styled-components/native";
import * as controller from "../../../../../controller";
import CInput from "../../../../../../../../../../components/default/cInput";
import strings from "../../../strings";
import ThemeContext from "../../../../../../../../../../../context/ThemeContext";

interface Props {
  showInputError: boolean;
  isDummy: boolean;
}

const NameInput: React.FC<Props> = (props) => {
  // Props
  const { showInputError, isDummy } = props;

  // Theme
  const theme = useContext(ThemeContext);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <Input
      title={strings().nameInputText}
      initialValue={controller.ProductEditor.getOriginalValue("name")}
      onValueUpdate={(value: string) =>
        controller.ProductEditor.setValue("name", value)
      }
      error={controller.ProductEditor.getErrorStatus("name")}
      success={controller.ProductEditor.getSuccessStatus("name")}
      statusMessage={controller.ProductEditor.getStatusMessage("name")}
      showError={showInputError}
      clearable
      onClear={() => controller.ProductEditor.resetValue("name")}
      reset={controller.ProductEditor.getValue("name") === ""}
      color={{
        changedColor: theme.colors.secondary,
        backgroundColor: theme.colors.surface,
        inputColor: theme.colors.on_surface,
        errorColor: theme.colors.error,
      }}
      textInput={{ autoFocus: !isDummy }}
    />
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const Input = styled(CInput)`
  margin-left: 20px;
`;

export default NameInput;

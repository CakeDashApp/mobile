import React, {useContext} from "react";
import styled from "styled-components/native";
import * as controller from "../../../controller";
import CInput from "../../../../../../../../components/default/cInput";
import strings from "../strings";
import ThemeContext from "../../../../../../../../../context/ThemeContext";

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
      initialValue={controller.TeamEditor.getOriginalValue("name")}
      onValueUpdate={(value: string) =>
        controller.TeamEditor.setValue("name", value)
      }
      error={controller.TeamEditor.getErrorStatus("name")}
      success={controller.TeamEditor.getSuccessStatus("name")}
      statusMessage={controller.TeamEditor.getStatusMessage("name")}
      showError={showInputError}
      clearable
      onClear={() => controller.TeamEditor.resetValue("name")}
      color={{
        changedColor: theme.colors.secondary,
        backgroundColor: theme.colors.surface,
        inputColor: theme.colors.on_surface,
        errorColor: theme.colors.error,
      }}
      onFocus={onFocus}
      onBlur={onBlur}
      reset={controller.TeamEditor.getValue("name") === ""}
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

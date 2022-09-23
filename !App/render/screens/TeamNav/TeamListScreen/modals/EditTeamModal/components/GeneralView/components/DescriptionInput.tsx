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
      initialValue={controller.TeamEditor.getOriginalValue("description")}
      onValueUpdate={(value: string) =>
        controller.TeamEditor.setValue("description", value)
      }
      error={controller.TeamEditor.getErrorStatus("description")}
      success={controller.TeamEditor.getSuccessStatus("description")}
      statusMessage={controller.TeamEditor.getStatusMessage("description")}
      showError={showInputError}
      clearable
      onClear={() => controller.TeamEditor.resetValue("description")}
      color={{
        changedColor: theme.colors.secondary,
        backgroundColor: theme.colors.surface,
        inputColor: theme.colors.on_surface,
        errorColor: theme.colors.error,
      }}
      multiline
      onFocus={onFocus}
      onBlur={onBlur}
      reset={controller.TeamEditor.getValue("description") === ""}
    />
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const Input = styled(CInput)`
  margin-top: 10px;
  max-height: 150px;
`;

export default DescriptionInput;

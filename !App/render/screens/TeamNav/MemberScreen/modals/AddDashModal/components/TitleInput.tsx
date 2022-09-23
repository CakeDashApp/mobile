import React, {useContext} from "react";
import styled from "styled-components/native";
import * as controller from "../controller";
import CInput from "../../../../../../components/default/cInput";
import strings from "../strings";
import ThemeContext from "../../../../../../../context/ThemeContext";

interface Props {
  showInputError: boolean;
}

const TitleInput: React.FC<Props> = (props) => {
  // Props
  const { showInputError } = props;

  // Theme
  const theme = useContext(ThemeContext);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <Input
      title={strings().titleInputLabel}
      initialValue={controller.AddDashEditor.getOriginalValue("title")}
      onValueUpdate={(value: string) =>
        controller.AddDashEditor.setValue("title", value)
      }
      error={controller.AddDashEditor.getErrorStatus("title")}
      success={controller.AddDashEditor.getSuccessStatus("title")}
      statusMessage={controller.AddDashEditor.getStatusMessage("title")}
      showError={showInputError}
      clearable
      onClear={() => controller.AddDashEditor.resetValue("title")}
      color={{
        changedColor: theme.colors.secondary,
        backgroundColor: theme.colors.surface,
        inputColor: theme.colors.on_surface,
        errorColor: theme.colors.error,
      }}
    />
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const Input = styled(CInput)`
  margin-bottom: 5px;
`;

export default TitleInput;

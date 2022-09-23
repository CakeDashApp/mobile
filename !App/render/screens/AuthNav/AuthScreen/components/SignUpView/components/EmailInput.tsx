import React, { useContext } from "react";
import styled from "styled-components/native";
import CInput from "../../../../../../components/default/cInput";
import * as controller from "../../../controller";
import CIcon from "../../../../../../../assets/icons/cIcon";
import ThemeContext from "../../../../../../../context/ThemeContext";

interface Props {
  showInputError: boolean;
}

const EmailInput: React.FC<Props> = (props) => {
  // Props
  const { showInputError } = props;

  // Theme
  const theme = useContext(ThemeContext);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <Input
      title={"Email"}
      initialValue={
        controller.SignUpEditor.getItemById("email")?.initialStateValue
      }
      onValueUpdate={(value: string) =>
        controller.SignUpEditor.setValue("email", value)
      }
      error={controller.SignUpEditor.getStatus("email")?.type === "error"}
      statusMessage={controller.SignUpEditor.getStatus("email")?.message}
      showError={controller.SignUpEditor.getStatus("email")?.type === "error"}
      clearable
      onClear={() => controller.SignUpEditor.getItemById("email")?.reset()}
      color={{
        changedColor: theme.colors.secondary,
        backgroundColor: theme.colors.surface,
        inputColor: theme.colors.on_surface,
        errorColor: theme.colors.error,
      }}
      leftElement={
        <CIcon size={25} type={"mail"} backgroundColor={theme.colors.surface} />
      }
    />
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const Input = styled(CInput)`
  margin-bottom: 5px;
`;

export default EmailInput;

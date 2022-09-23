import React, { useContext } from "react";
import styled from "styled-components/native";
import CInput from "../../../../../../components/default/cInput";
import * as controller from "../../../controller";
import CIcon from "../../../../../../../assets/icons/cIcon";
import ThemeContext from "../../../../../../../context/ThemeContext";

interface Props {
  showInputError: boolean;
}

const PasswordInput: React.FC<Props> = (props) => {
  // Props
  const { showInputError } = props;

  // Theme
  const theme = useContext(ThemeContext);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <Input
      title={"Password"}
      initialValue={
        controller.SignUpEditor.getItemById("password")?.initialStateValue
      }
      onValueUpdate={(value: string) =>
        controller.SignUpEditor.setValue("password", value)
      }
      error={controller.SignUpEditor.getStatus("password")?.type === "error"}
      statusMessage={controller.SignUpEditor.getStatus("password")?.message}
      showError={
        controller.SignUpEditor.getStatus("password")?.type === "error"
      }
      color={{
        changedColor: theme.colors.secondary,
        backgroundColor: theme.colors.surface,
        inputColor: theme.colors.on_surface,
        errorColor: theme.colors.error,
      }}
      password
      leftElement={<CIcon size={25} type={"lock"} />}
    />
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const Input = styled(CInput)`
  margin-bottom: 5px;
`;

export default PasswordInput;

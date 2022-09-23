import React, { useContext } from "react";
import styled from "styled-components/native";
import CInput from "../../../../../../components/default/cInput";
import * as controller from "../../../controller";
import CIcon from "../../../../../../../assets/icons/cIcon";
import ThemeContext from "../../../../../../../context/ThemeContext";

interface Props {}

const PasswordInput: React.FC<Props> = (props) => {
  // Theme
  const theme = useContext(ThemeContext);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <Input
      title={"Password"}
      initialValue={
        controller.SignInEditor.getItemById("password")?.initialStateValue
      }
      onValueUpdate={(value: string) =>
        controller.SignInEditor.setValue("password", value)
      }
      error={controller.SignInEditor.getStatus("password")?.type === "error"}
      statusMessage={controller.SignInEditor.getStatus("password")?.message}
      showError={
        controller.SignInEditor.getStatus("password")?.type === "error"
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

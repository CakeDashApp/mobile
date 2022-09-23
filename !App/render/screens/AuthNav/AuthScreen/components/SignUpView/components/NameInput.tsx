import React, { useContext } from "react";
import styled from "styled-components/native";
import CInput from "../../../../../../components/default/cInput";
import * as controller from "../../../controller";
import CIcon from "../../../../../../../assets/icons/cIcon";
import ThemeContext from "../../../../../../../context/ThemeContext";

interface Props {
  showInputError: boolean;
}

const NameInput: React.FC<Props> = (props) => {
  // Props
  const { showInputError } = props;

  // Theme
  const theme = useContext(ThemeContext);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <Input
      title={"Name"}
      initialValue={
        controller.SignUpEditor.getItemById("name")?.initialStateValue
      }
      onValueUpdate={(value: string) =>
        controller.SignUpEditor.setValue("name", value)
      }
      error={controller.SignUpEditor.getStatus("name")?.type === "error"}
      statusMessage={controller.SignUpEditor.getStatus("name")?.message}
      showError={controller.SignUpEditor.getStatus("name")?.type === "error"}
      clearable
      onClear={() => controller.SignUpEditor.getItemById("name")?.reset()}
      color={{
        changedColor: theme.colors.secondary,
        backgroundColor: theme.colors.surface,
        inputColor: theme.colors.on_surface,
        errorColor: theme.colors.error,
      }}
      leftElement={<CIcon size={25} type={"user"} />}
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

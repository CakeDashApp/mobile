import React, { useContext } from "react";
import styled from "styled-components/native";
import strings from "../strings";
import * as controller from "../controller";
import CInput from "../../../../../../components/default/cInput";
import ThemeContext from "../../../../../../../context/ThemeContext";

interface Props {}

const NameInput: React.FC<Props> = (props) => {
  // Theme
  const theme = useContext(ThemeContext);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <Input
      title={strings().nameInputText}
      initialValue={
        controller.ExtraProfileEditor.getItemById("name")?.initialStateValue
      }
      onValueUpdate={(value: string) =>
        controller.ExtraProfileEditor.setValue("name", value, {
          background: false,
        })
      }
      error={controller.ExtraProfileEditor.getStatus("name")?.type === "error"}
      statusMessage={controller.ExtraProfileEditor.getStatus("name")?.message}
      showError={
        controller.ExtraProfileEditor.getStatus("name")?.type === "error"
      }
      clearable
      onClear={() => controller.ExtraProfileEditor.getItemById("name")?.reset()}
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

export default NameInput;

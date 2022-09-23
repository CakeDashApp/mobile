import React, { useContext } from "react";
import styled from "styled-components/native";
import strings from "../strings";
import * as controller from "../controller";
import CInput from "../../../../../../components/default/cInput";
import ThemeContext from "../../../../../../../context/ThemeContext";

interface Props {}

const DescriptionInput: React.FC<Props> = (props) => {
  // Theme
  const theme = useContext(ThemeContext);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <Input
      title={strings().descriptionInputText}
      initialValue={
        controller.ExtraProfileEditor.getItemById("description")
          ?.initialStateValue
      }
      onValueUpdate={(value: string) =>
        controller.ExtraProfileEditor.setValue("description", value, {
          background: false,
        })
      }
      error={
        controller.ExtraProfileEditor.getStatus("description")?.type === "error"
      }
      statusMessage={
        controller.ExtraProfileEditor.getStatus("description")?.message
      }
      showError={
        controller.ExtraProfileEditor.getStatus("description")?.type === "error"
      }
      clearable
      onClear={() =>
        controller.ExtraProfileEditor.getItemById("description")?.reset()
      }
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

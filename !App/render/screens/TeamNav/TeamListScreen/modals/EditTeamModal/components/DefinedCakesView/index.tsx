import React, {useCallback, useContext} from "react";
import { View } from "react-native";
import * as controller from "../../controller";
import AddProductsView from "./components/AddProductView";
import CText from "../../../../../../../components/default/cText";
import styled from "styled-components/native";
import strings from "./strings";
import ActiveButton from "./components/ActiveButton";
import { useAgile } from "@agile-ts/react";
import ThemeContext from "../../../../../../../../context/ThemeContext";

interface Props {
  onFocus: () => void;
  showInputError: boolean;
}

const DefinedCakesView: React.FC<Props> = (props) => {
  // Props
  const { onFocus, showInputError } = props;

  // Theme
  const theme = useContext(ThemeContext);

  // Is Active
  const isActive = controller.TeamEditor.getValue("definedCakes") || false;

  // Make Form reactive
  useAgile(controller.ProductEditor.dependencies);

  //======================================================================================================================
  // On Active
  //======================================================================================================================

  const onActive = useCallback(() => {
    controller.TeamEditor.setValue("definedCakes", !isActive);

    // Have to update Products.. otherwise it won't get validated.. because its the same like the originalProducts..
    if (!isActive) controller.TeamEditor.setValue("products", []);
    else controller.TeamEditor.setValue("products", null);
  }, [isActive]);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <View>
      <ActiveButton selected={isActive} onPress={onActive} />
      {isActive && <AddProductsView isDummy={true} onFocus={onFocus} />}
      {showInputError && controller.TeamEditor.getErrorStatus("products") && (
        <CText bold color={theme.colors.error}>
          {controller.TeamEditor.getStatusMessage("products")}
        </CText>
      )}
      <Description color={theme.colors.on_surface_3} size={10}>
        {strings().definedCakesDescription}
      </Description>
    </View>
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const Description = styled(CText)`
  margin-top: 10px;
`;

export default DefinedCakesView;

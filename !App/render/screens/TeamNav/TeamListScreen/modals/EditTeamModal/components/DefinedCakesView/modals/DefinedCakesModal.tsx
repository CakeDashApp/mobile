import React from "react";
import CSectionModal from "../../../../../../../../components/project/cSectionModal";
import AddProductsView from "../components/AddProductView";
import { useNavigation } from "@react-navigation/native";
import * as controller from "../../../controller";
import strings from "../../../strings";
import { useAgile } from "@agile-ts/react";

interface Props {}

const DefinedCakesModal: React.FC<Props> = (props) => {
  // Navigation
  const navigation = useNavigation();
  const goToEditTeamModal = () => navigation.navigate("EditTeamModal");

  // Make Form reactive
  useAgile(controller.ProductEditor.dependencies);
  useAgile(controller.TeamEditor.dependencies);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <CSectionModal
      sections={[
        {
          key: 1,
          content: (
            <AddProductsView
              isDummy={false}
              onFocus={() => {}}
              flatList={true}
            />
          ),
          name: strings().definedCakesTitle,
          icon: { type: "cake", iconStroke: 2 },
        },
      ]}
      onGoBack={goToEditTeamModal}
      backButton
      scrollView={false}
    />
  );
};

export default DefinedCakesModal;

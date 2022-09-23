import React, {useContext, useEffect, useState} from "react";
import BottomModal from "./components/BottomModal";
import * as controller from "./controller";
import { ItemInterface } from "./controller";
import CText from "../cText";
import strings from "./strings";
import ModalTrigger from "./components/ModalTrigger";
import ThemeContext from "../../../../context/ThemeContext";

interface Props {
  //Items
  items: ItemInterface[];

  //OnChange
  onChange: (options: { key: string | number; label: string }) => void;

  //Other
  cancel?: boolean;
  absolute?: boolean;
}

const CBottomSelector: React.FC<Props> = props => {
  // Props
  const { cancel, onChange, absolute, children } = props;
  const items: ItemInterface[] = props.items || [];
  const [modalItems, setModalItems] = useState<ItemInterface[]>(items);

  // Theme
  const theme = useContext(ThemeContext);

  // Show
  const [showModal, setShowModal] = useState<boolean>(false);

  //======================================================================================================================
  // Add Cancel to Items
  //======================================================================================================================

  useEffect(() => {
    setModalItems(
      controller.instantiateItems(
        items,
        cancel || false,
        <CText color={theme.colors.error}> {strings().cancelButtonText} </CText>
      )
    );
  }, [cancel, items]);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <>
      <ModalTrigger
        absolute={absolute || false}
        onPress={() => setShowModal(true)}
      >
        {children}
      </ModalTrigger>
      <BottomModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onChange={onChange}
        items={modalItems}
      />
    </>
  );
};

export default CBottomSelector;

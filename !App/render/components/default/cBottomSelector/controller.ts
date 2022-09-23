import { ReactElement } from "react";

export interface ItemInterface {
  key: string | number;
  label: string;
  component?: ReactElement;
}

// Cancel Key
export const CANCEL_KEY = "CANCEL_KEY";

//======================================================================================================================
// Instantiate Items
//======================================================================================================================

export const instantiateItems = (
  items: ItemInterface[],
  cancel: boolean,
  cancelComponent: ReactElement
): ItemInterface[] => {
  const newItems = [...items];
  if (cancel && newItems.findIndex((item) => item.key === CANCEL_KEY) === -1) {
    newItems.push({
      key: CANCEL_KEY,
      label: "",
      component: cancelComponent,
    });
  }
  return newItems;
};

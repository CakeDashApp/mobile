import { CakeInterface } from "./cake.interface";
import { CAKES } from "./cake.controller";

import { sendListenerLog, sendTable } from "../../helper/general/logger.helper";

export const cakeListener = (ref: any) => {
  ref.on("value", (snapshot: any) => {
    // Cake
    const cake: CakeInterface = snapshot.val();
    const cakeId = snapshot.key;

    sendListenerLog("Cake Listener " + cakeId);
    sendTable(cake);

    // Check if Cake Object is complete
    if (
      !cake ||
      !cake.cakeData ||
      !cake.cakeData.product ||
      !cake.cakeData.date
    ) {
      sendListenerLog("Remove Cake " + cakeId);
      CAKES.remove(cakeId).everywhere();
      return;
    }

    // Format Fetched Values
    cake.cakeData.product.imageId = cake.cakeData.product.imageId || null;

    // Core
    CAKES.update(cakeId, cake);

    sendListenerLog("End Cake Listener");
  });
};

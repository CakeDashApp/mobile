import { EVENTS } from "./event.controller";
import { EventInterface } from "./event.interface";

import { sendListenerLog, sendTable } from "../../helper/general/logger.helper";

export const eventListener = (ref: any) => {
  ref.on("value", (snapshot: any) => {
    // Event
    const event: EventInterface = snapshot.val();
    const eventId = snapshot.key;

    sendListenerLog("Event Listener " + eventId);
    sendTable(event);

    // Check if Event Object is complete
    if (!event || !event.eventData || !event.eventData.date) {
      sendListenerLog("Remove Event " + eventId);
      EVENTS.remove(eventId).everywhere();
      return;
    }

    // Format Fetched Values
    event.eventData.navigation = event.eventData.navigation || null;
    event.eventData.info = event.eventData.info || null;
    event.eventData.listItemData = event.eventData.listItemData || {};

    // Core
    EVENTS.update(eventId, event);

    sendListenerLog("End Event Listener");
  });
};

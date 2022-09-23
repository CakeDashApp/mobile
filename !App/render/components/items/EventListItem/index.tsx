import React, { useEffect, useState } from "react";
import core from "../../../../src/core";
import ListItem from "./components/ListItem";
import LoadingListItem from "./components/LoadingListItem";
import {
  EventInterface,
  EventListItemInterface,
} from "../../../../src/core/controllers/event/event.interface";

interface Props {
  event: EventInterface;
  onPress: (eventId: string, screen: string) => void;
  backgroundColor: string;
}

const EventListItem: React.FC<Props> = (props) => {
  // Props
  const { backgroundColor, event, onPress } = props;

  // Default
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // ListItem
  const [eventListItem, setEventListItem] = useState<EventListItemInterface>({
    title: "Error",
    imageId: null,
    labelType: "error",
  });

  //======================================================================================================================
  // Fetch Event List Item
  //======================================================================================================================

  useEffect(() => {
    const fetchEventListItem = async () => {
      setIsLoading(true);
      setEventListItem(
        await core.event.getEventListItem(
          event.type,
          event.eventData.listItemData
        )
      );
      setIsLoading(false);
    };
    fetchEventListItem();
  }, []);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return !isLoading ? (
    <ListItem
      event={event}
      eventListItem={eventListItem}
      onPress={onPress}
      backgroundColor={backgroundColor}
    />
  ) : (
    <LoadingListItem backgroundColor={backgroundColor} />
  );
};

export default EventListItem;

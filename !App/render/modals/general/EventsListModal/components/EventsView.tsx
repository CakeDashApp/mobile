import React, {useContext} from "react";
import { FlatList, View } from "react-native";
import EventListItem from "../../../../components/items/EventListItem";
import { EventInterface } from "../../../../../src/core/controllers/event/event.interface";
import ThemeContext from "../../../../../context/ThemeContext";

interface Props {
  events: EventInterface[];
  onEventPressed: (eventId: string, screen: string) => void;
}

const EventsView: React.FC<Props> = (props) => {
  // Props
  const { events, onEventPressed } = props;

  // Theme
  const theme = useContext(ThemeContext);

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <FlatList
      data={events.sort(function (a, b) {
        return (
          new Date(b.eventData.date.creationDate).getTime() -
          new Date(a.eventData.date.creationDate).getTime()
        );
      })}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <View
          style={{
            marginBottom: itemData.index === events.length - 1 ? 200 : 0,
          }}
        >
          <EventListItem
            event={itemData.item}
            onPress={onEventPressed}
            backgroundColor={theme.colors.surface}
          />
        </View>
      )}
    />
  );
};

export default EventsView;

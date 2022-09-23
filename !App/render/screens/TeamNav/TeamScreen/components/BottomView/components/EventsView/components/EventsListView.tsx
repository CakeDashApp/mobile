import React, {useContext} from "react";
import { View } from "react-native";
import EventListItem from "../../../../../../../../components/items/EventListItem";
import CBottomButton from "../../../../../../../../components/project/cBottomButton";
import styled from "styled-components/native";
import { EventInterface } from "../../../../../../../../../src/core/controllers/event/event.interface";
import ThemeContext from "../../../../../../../../../context/ThemeContext";

interface Props {
  events: EventInterface[];
  onEventPressed: (eventId: string, screen: string) => void;
  onMoreButtonPressed: () => void;
}

const EventsListView: React.FC<Props> = (props) => {
  // Props
  const { events, onEventPressed, onMoreButtonPressed } = props;

  // Theme
  const theme = useContext(ThemeContext);

  const maxEventsShown = 2;

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <View>
      {events
        .sort(function (a, b) {
          return (
            new Date(b.eventData.date.creationDate).getTime() -
            new Date(a.eventData.date.creationDate).getTime()
          );
        })
        .slice(0, maxEventsShown)
        .map((event) => (
          <View key={event.id}>
            <EventListItem
              event={event}
              onPress={onEventPressed}
              backgroundColor={theme.colors.background}
            />
          </View>
        ))}
      {events.length > maxEventsShown && (
        <BottomButtonContainer>
          <CBottomButton onPress={onMoreButtonPressed} icon={"chevronDown"} />
        </BottomButtonContainer>
      )}
    </View>
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const BottomButtonContainer = styled.View`
  align-items: center;
`;

export default EventsListView;

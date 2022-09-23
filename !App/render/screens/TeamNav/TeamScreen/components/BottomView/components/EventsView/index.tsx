import React, {useCallback, useContext, useEffect, useState} from "react";
import styled from "styled-components/native";
import core from "../../../../../../../../src/core";
import CText from "../../../../../../../components/default/cText";
import CIcon from "../../../../../../../../assets/icons/cIcon";
import CTabRow, {
  TagInterface,
} from "../../../../../../../components/project/cTabRow";
import * as controller from "./controller";
import NoEventsView from "./components/NoEventsView";
import EventsListView from "./components/EventsListView";
import strings from "./strings";
import { useAgile } from "@agile-ts/react";
import { EventInterface } from "../../../../../../../../src/core/controllers/event/event.interface";
import ThemeContext from "../../../../../../../../context/ThemeContext";

interface Props {
  teamId: string | null;
  goToEventsListModal: (teamId: string, search: boolean) => void;
  goToEvent: (eventId: string, screen: string) => void;
}

const EventsView: React.FC<Props> = (props) => {
  // Props
  const { teamId, goToEventsListModal, goToEvent } = props;

  // Theme
  const theme = useContext(ThemeContext);

  // Events
  const [filteredEvent, setFilteredEvents] = useState<EventInterface[]>([]);
  const [oldEvents, setOldEvents] = useState<EventInterface[]>([]);
  const [events] = useAgile([core.event.EVENTS.getGroup(teamId || "")]);

  // Tag
  const [currentTag, setCurrentTag] = useState<string | number>(
    controller.ALL_TAG
  );

  //======================================================================================================================
  // Set Start Tag
  //======================================================================================================================

  useEffect(() => {
    // Why making it so wired? -> because somehow if the event group doesn't exist und u are listening to it in a useEffect and setting a State
    // it will cause a endless rerender
    if (events.length > 0 || oldEvents.length > 0) {
      setOldEvents(events);
      setFilteredEvents(controller.filterEvents(currentTag, events));
    }
  }, [events]);

  //======================================================================================================================
  // On Tag Changed
  //======================================================================================================================

  const onTagChanged = useCallback(
    (tag: TagInterface) => {
      setCurrentTag(tag.key);
      setFilteredEvents(controller.filterEvents(tag.key, events));
    },
    [events]
  );

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <Container>
      <HeaderContainer>
        <CIcon
          type={"fileText"}
          color={theme.colors.on_background}
          size={25}
          strokeWidth={2}
        />
        <EventsText bold color={theme.colors.on_background} size={25}>
          {strings().eventsTitle}
        </EventsText>
      </HeaderContainer>
      <CTabRow
        tags={[
          { key: controller.ALL_TAG, label: strings().allTagText },
          { key: controller.TEAM_TAG, label: strings().teamTagText },
          { key: controller.MEMBER_TAG, label: strings().memberTagText },
        ]}
        onTagChanged={onTagChanged}
        searchTag={{
          onSearch: () => goToEventsListModal(teamId || "", true),
          isDummy: true,
        }}
      />
      {filteredEvent.length > 0 ? (
        <EventsListView
          events={filteredEvent}
          onEventPressed={goToEvent}
          onMoreButtonPressed={() => goToEventsListModal(teamId || "", false)}
        />
      ) : (
        <NoEventsView />
      )}
    </Container>
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const Container = styled.View`
  margin: 20px 10px 0 10px;
`;

const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const EventsText = styled(CText)`
  margin-left: 5px;
`;

export default EventsView;

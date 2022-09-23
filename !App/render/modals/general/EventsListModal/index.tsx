import React, { useCallback, useEffect, useState } from "react";
import core from "../../../../src/core";
import * as controller from "./controller";
import { useNavigation, useRoute } from "@react-navigation/native";
import CTabRow, { TagInterface } from "../../../components/project/cTabRow";
import CSectionModal from "../../../components/project/cSectionModal";
import styled from "styled-components/native";
import NoEventsView from "./components/NoEventsView";
import EventsView from "./components/EventsView";
import strings from "./strings";
import { withInteractionsManaged } from "../../../../navigation/helper/with-interactions-managed";
import NavigationLoadingScreen from "../../../../navigation/components/NavigationLoadingScreen";
import { EventInterface } from "../../../../src/core/controllers/event/event.interface";
import { useAgile } from "@agile-ts/react";

interface Props {}

const EventsListModal: React.FC<Props> = (props) => {
  // Navigation
  const navigation = useNavigation();
  const route = useRoute();
  const goBack = () => navigation.goBack();
  const goToEvent = (eventId: string, screen: string) =>
    navigation.navigate(screen, { eventId: eventId });

  // Team
  const teamId: string | null = route.params?.teamId || null;

  // Events
  const [filteredEvent, setFilteredEvents] = useState<EventInterface[]>([]);
  const [oldEvents, setOldEvents] = useState<EventInterface[]>([]);
  const events = useAgile(core.event.EVENTS.getGroup(teamId || ""));

  // Tag
  const [currentTag, setCurrentTag] = useState<string | number>(
    controller.ALL_TAG
  );

  // Search
  const search: boolean = route.params?.search || false;

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
  // On Search Value Changed
  //======================================================================================================================

  const onSearchValueChanged = useCallback(
    async (value: string | null) => {
      if (value !== null) {
        setFilteredEvents(
          controller.filterEvents(
            currentTag,
            events.filter((event) =>
              event.eventData.listItemData.title.startsWith(value)
            )
          )
        );
      } else setFilteredEvents(controller.filterEvents(currentTag, events));
    },
    [currentTag, events]
  );

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <CSectionModal
      sections={[
        {
          key: 1,
          content: (
            <Container>
              <CTabRow
                tags={[
                  { key: controller.ALL_TAG, label: strings().allTagText },
                  { key: controller.TEAM_TAG, label: strings().teamTagText },
                  {
                    key: controller.MEMBER_TAG,
                    label: strings().memberTagText,
                  },
                ]}
                onTagChanged={onTagChanged}
                searchTag={{
                  initialFocused: search,
                }}
                onSearchValueChanged={onSearchValueChanged}
              />
              {filteredEvent.length > 0 ? (
                <EventsView onEventPressed={goToEvent} events={filteredEvent} />
              ) : (
                <NoEventsView />
              )}
            </Container>
          ),
          name: strings().eventsTitle,
          icon: { type: "fileText", iconStroke: 2 },
        },
      ]}
      onGoBack={goBack}
      backButton
      scrollView={false}
    />
  );
};

//======================================================================================================================
// Styles
//======================================================================================================================

const Container = styled.View`
  height: 100%;
`;

export default withInteractionsManaged(
  EventsListModal,
  NavigationLoadingScreen
);

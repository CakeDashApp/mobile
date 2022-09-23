import { EventInterface } from "../../../../../../../../src/core/controllers/event/event.interface";

// Tags
export const MEMBER_TAG = "member";
export const TEAM_TAG = "team";
export const ALL_TAG = "all";

//======================================================================================================================
// Filter Events
//======================================================================================================================

export const filterEvents = (
  tagKey: string | number,
  events: EventInterface[]
): EventInterface[] => {
  let filteredEvents: EventInterface[] = [];

  // Filter Teams
  switch (tagKey) {
    case ALL_TAG:
      filteredEvents = events;
      break;

    case MEMBER_TAG:
      filteredEvents = events;
      break;

    case TEAM_TAG:
      filteredEvents = events;
      break;
  }

  return filteredEvents;
};

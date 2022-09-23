import {
  EventInterface,
  EventListItemDataInterface,
  EventNavigationInterface,
} from "./event.interface";
import { EVENTS } from "./event.controller";
import {
  FETCH_EVENT,
  REMOVE_EVENT,
  UPDATE_EVENT,
  UPDATE_EVENT_INFO,
} from "./event.routes";
import { generateId } from "../../helper/general/id.helper";
import { sendCoreLog } from "../../helper/general/logger.helper";
import { addHours, formatDateToUTC } from "../../helper/general/date.helper";
import { ErrorInterface } from "../error/error.interface";
import { setTeamEventIds } from "../team/team.actions";
import { setMemberEventIds } from "../member/member.actions";

// Event Groups:
// default
// teamId
// memberId

//======================================================================================================================
// Create Event
//======================================================================================================================

export const createEvent = async (
  teamId: string,
  memberId: string | null,
  type: string,
  existTime: number,
  listItemData: EventListItemDataInterface,
  info?: any,
  navigation?: EventNavigationInterface,
  id?: string
): Promise<EventInterface | ErrorInterface> => {
  sendCoreLog("Create Event");

  // Event Id
  const eventId = id || generateId();

  // Dates
  const creationDate = formatDateToUTC(new Date());
  const endDate = formatDateToUTC(addHours(new Date(creationDate), existTime));

  // Create Event
  const event: EventInterface = {
    id: eventId,
    teamId: teamId,
    memberId: memberId,
    type: type,
    eventData: {
      date: {
        creationDate: creationDate,
        endDate: endDate,
      },
      navigation: navigation || null,
      listItemData: listItemData,
      info: info,
    },
  };

  // Update Event
  const updateEventResponse = await UPDATE_EVENT(eventId, event, true);
  if (updateEventResponse !== null && "error" in updateEventResponse)
    return updateEventResponse;

  // Core
  EVENTS.collect(event, teamId);
  if (memberId) EVENTS.collect(event, memberId);
  EVENTS.collect(event, "default");

  // Update Member EventIds
  if (memberId) {
    const updatedMember = await setMemberEventIds(memberId, eventId, true);
    if ("error" in updatedMember) return updatedMember;
  }

  // Update Team EventIds
  const updatedTeam = await setTeamEventIds(teamId, eventId, true);
  if ("error" in updatedTeam) return updatedTeam;

  sendCoreLog("End Create Event");
  return event;
};

//======================================================================================================================
// Fetch Event
//======================================================================================================================

export const fetchEvent = async (
  id: string
): Promise<EventInterface | ErrorInterface> => {
  sendCoreLog("Fetch Event " + id);

  const event = EVENTS.getItemById(id);
  if (event && event.exists) return event.copy();

  // Fetch Event
  const firebaseEvent = await FETCH_EVENT(id, true);
  if ("error" in firebaseEvent) return firebaseEvent;

  // Check if Event Object is complete
  if (!firebaseEvent.eventData || !firebaseEvent.eventData.date)
    return {
      error: {
        message: "Failed to fetch Event!",
        type: "firebase",
        e: null,
      },
    };

  // Format Fetched Values
  firebaseEvent.eventData.navigation =
    firebaseEvent.eventData.navigation || null;
  firebaseEvent.eventData.info = firebaseEvent.eventData.info || null;
  firebaseEvent.eventData.listItemData =
    firebaseEvent.eventData.listItemData || {};

  // Core
  EVENTS.collect(firebaseEvent, firebaseEvent.teamId);
  if (firebaseEvent.memberId)
    EVENTS.collect(firebaseEvent, firebaseEvent.memberId);

  return firebaseEvent;
};

//======================================================================================================================
// Fetch Events
//======================================================================================================================

export const fetchEvents = async (
  eventIds: string[]
): Promise<ErrorInterface | EventInterface[]> => {
  sendCoreLog("Fetch Events");

  // Error
  let error: ErrorInterface | null = null;

  // Events
  const events: EventInterface[] = [];

  // Create Event Promises
  const eventPromises: Promise<EventInterface | ErrorInterface>[] = [];
  for (let i = 0; i < eventIds.length; i++) {
    eventPromises.push(
      new Promise<EventInterface | ErrorInterface>(async (resolve) => {
        resolve(await fetchEvent(eventIds[i]));
      })
    );
  }

  // Evaluate Event Promises
  const eventPromisesResult = await Promise.all(eventPromises);
  for (let i = 0; i < eventPromisesResult.length; i++) {
    if (!("error" in eventPromisesResult[i]))
      events.push(eventPromisesResult[i] as EventInterface);
    else error = eventPromisesResult[i] as ErrorInterface;
  }

  sendCoreLog("End Fetch Events");
  return error || events;
};

//======================================================================================================================
// Remove Event
//======================================================================================================================

export const removeEvent = async (
  id: string,
  _setMemberEventIds = true,
  _setTeamEventIds = true
): Promise<ErrorInterface | null> => {
  sendCoreLog("Remove Event " + id);

  // Fetch Event
  const event = await fetchEvent(id);
  if ("error" in event) return event;

  // Update Member EventIds
  if (_setMemberEventIds && event.memberId) {
    const updatedMember = await setMemberEventIds(event.memberId, id, false);
    if ("error" in updatedMember) return updatedMember;
  }

  // Update Team EventIds
  if (_setTeamEventIds) {
    const updatedTeam = await setTeamEventIds(event.teamId, id, false);
    if ("error" in updatedTeam) return updatedTeam;
  }

  // Remove Event
  const removeEventResponse = await REMOVE_EVENT(id);
  if (removeEventResponse !== null && "error" in removeEventResponse)
    return removeEventResponse;

  // Core
  EVENTS.remove(id).everywhere();

  sendCoreLog("End Remove Event " + id);
  return null;
};

//======================================================================================================================
// Set Event Info
//======================================================================================================================

export const setEventInfo = async (
  id: string,
  info: any
): Promise<EventInterface | ErrorInterface> => {
  sendCoreLog("Set Event Info " + id, { info: info });

  // Fetch Event
  const event = await fetchEvent(id);
  if ("error" in event) return event;

  // Update Values
  event.eventData.info = info;

  // Update Event Info
  const updateEventInfoResponse = await UPDATE_EVENT_INFO(id, info);
  if (updateEventInfoResponse !== null && "error" in updateEventInfoResponse)
    return updateEventInfoResponse;

  // Core
  EVENTS.update(id, event);

  sendCoreLog("End Set Event Info " + id);
  return event;
};

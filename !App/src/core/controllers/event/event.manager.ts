import {
  EventListItemDataInterface,
  EventListItemInterface,
} from "./event.interface";

import { getAddCakeEventListItem } from "./types/add-cake-event";
import { getAddDashEventListItem } from "./types/add-dash-event";
import { getBringCakeEventListItem } from "./types/bring-cake-event";
import { getConfirmedDashEventListItem } from "./types/confirmed-dash-event";
import { getJoinTeamEventListItem } from "./types/join-team-event";
import { getLeaveTeamEventListItem } from "./types/leave-team-event";
import { getNotConfirmedDashEventListItem } from "./types/not-confirmed-dash-event";
import { getVoteDashEventListItem } from "./types/vote-dash-event";
import { getNotConfirmedCakeEventListItem } from "./types/not-confirmed-cake-event";

export const maxNameLength = 10;

export const getEventListItem = async (
  type: string,
  listItemData: EventListItemDataInterface
): Promise<EventListItemInterface> => {
  const keyMap: { [key: string]: Promise<EventListItemInterface> } = {
    addCakeEvent: getAddCakeEventListItem(listItemData),
    addDashEvent: getAddDashEventListItem(listItemData),
    bringCakeEvent: getBringCakeEventListItem(listItemData),
    confirmedDashEvent: getConfirmedDashEventListItem(listItemData),
    joinTeamEvent: getJoinTeamEventListItem(listItemData),
    leaveTeamEvent: getLeaveTeamEventListItem(listItemData),
    notConfirmedDashEvent: getNotConfirmedDashEventListItem(listItemData),
    voteDashEvent: getVoteDashEventListItem(listItemData),
    notConfirmedCakeEvent: getNotConfirmedCakeEventListItem(listItemData),
  };

  return (
    keyMap[type] || {
      title: "Error",
      imageId: null,
      labelType: "error",
    }
  );
};

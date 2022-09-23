export type LabelType = "vote" | "info" | "cake" | "error";

export interface EventListItemInterface {
  title: string;
  imageId: string | null;
  labelType: LabelType;
}

export interface EventListItemDataInterface {
  [key: string]: string;
}

export interface EventNavigationInterface {
  screen: string;
}

export interface EventDataInterface<EventInfo = any> {
  date: {
    creationDate: string;
    endDate: string;
  };
  // Events have a own Navigator (EventNav)
  navigation: EventNavigationInterface | null;
  listItemData: EventListItemDataInterface;
  // Info stores specific Information's for an event
  info: EventInfo;
}

export interface EventInterface<EventInfo = any> {
  id: string;
  teamId: string;
  memberId: string | null;
  type: string;
  eventData: EventDataInterface<EventInfo>;
}

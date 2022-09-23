export interface TeamMembersInterface {
  adminIds: string[];
  creatorId: string;
  memberIds: string[];
}

export interface TeamSettingsInterface {
  status: "open" | "closed" | "invite";
  dashes: number;
  definedCakes: boolean;
  hiddenDasher: boolean;
  showJoinLeaveEvents: boolean;
}

export interface TeamDataInterface {
  name: string;
  description: string;
  imageId: string | null;
  members: TeamMembersInterface;
  settings: TeamSettingsInterface;
}

export interface TeamInterface {
  id: string;
  eventIds: string[];
  cakeIds: string[];
  productIds: string[];
  teamData: TeamDataInterface;
}

import { StatusType } from "../user/user.interface";

export type RoleType = "admin" | "creator" | "member";

export interface MemberProductInterface {
  id: string | null;
  dashes: number;
  dashesNeeded: number;
}

export interface MemberStatsInterface {
  productsMade: number[];
  starAverage: number;
  totalDashes: number;
}

export interface MemberDataInterface {
  name: string;
  imageId: string | null;
  role: RoleType;
  product: MemberProductInterface;
  stats: MemberStatsInterface;
  status: StatusType;
}

export interface MemberInterface {
  id: string;
  teamId: string;
  userId: string;
  cakeIds: string[];
  eventIds: string[];
  memberData: MemberDataInterface;
}

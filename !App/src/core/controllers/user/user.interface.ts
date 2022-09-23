export interface UserStatsInterface {
  bakeSkill: 0 | 1 | 2 | 3 | 4 | 5;
  totalDashes: number;
  totalCakes: number;
}

export type StatusType = "online" | "offline" | "away";

export interface UserDataInterface {
  name: string;
  description: string;
  imageId: string | null;
  badges: string[];
  stats: UserStatsInterface;
  status: StatusType;
}

export interface UserInterface {
  id: string;
  memberIds: string[];
  userData: UserDataInterface;
}

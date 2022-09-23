export interface VoteDashEventInfoInterface {
  data: {
    title: string;
    description: string;
  };
  votes: {
    votesNeeded: number;
    confirmedVotes: number;
    rejectedVotes: number;
    votedMemberIds: string[];
  };
  dashGiverId: string;
  dashReceiverId: string;
}

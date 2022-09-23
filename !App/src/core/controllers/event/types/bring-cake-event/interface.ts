export interface BringCakeEventInfoInterface {
  data: {
    title: string;
    description: string;
    imageIds: string[];
  };
  ratings: {
    ratedMemberIds: string[];
    ratingAverage: number;
  };
  votes: {
    votesNeeded: number;
    confirmedVotes: number;
    rejectedVotes: number;
    votedMemberIds: string[];
  };
  cakeId: string;
  cakeBringerId: string;
}

export interface CakeDataInterface {
  date: {
    creationDate: string;
    endDate: string | null;
  };
  product: {
    id: string | null;
    imageId: string | null;
    name: string;
  };
}

export interface CakeInterface {
  id: string;
  teamId: string;
  memberId: string;
  cakeData: CakeDataInterface;
  isVisible: boolean;
}

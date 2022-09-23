export interface SourceInterface {
  source: {
    uri: string;
  };
}

export interface NoImageInterface {
  color: string;
  icon: "user" | "cake" | "users";
}

export interface ImageInterface {
  id: string;
  imageData: SourceInterface | NoImageInterface;
}

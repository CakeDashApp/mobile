export interface ErrorInterface {
  error: {
    type: "firebase" | "core" | "input" | "library" | "camera" | "other";
    message: string;
    e: object | null;
  };
}

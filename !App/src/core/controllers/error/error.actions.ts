import { ErrorInterface } from "./error.interface";
import { ERROR } from "./error.controller";

export const setError = (error: ErrorInterface | null) => {
  ERROR.set(error);
};

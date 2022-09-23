import { App } from "../../agile";
import { ErrorInterface } from "./error.interface";

export const ERROR = App.State<ErrorInterface | null>(null);

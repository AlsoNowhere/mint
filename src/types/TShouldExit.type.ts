import { Blueprint } from "../models/blueprint/Blueprint.model";

export type TShouldExit = {
  condition: boolean;
  value?: Blueprint;
};

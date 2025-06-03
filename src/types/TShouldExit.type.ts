import { Blueprint } from "../models/blueprint/Blueprint.model";

export type TShouldExit = {
  // ** Boolean to say if TRUE in order to exit generate
  // ** or FALSE to continue as normal.
  condition: boolean;
  value?: Blueprint;
};

import { Blueprint } from "../models/blueprint/Blueprint.model";

export type TRefresh = (
  blueprint: Blueprint,
  options: { newlyInserted: boolean }
) => void;

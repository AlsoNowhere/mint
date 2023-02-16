import { MintTemplate } from "../models/MintTemplate.model";

export const template = (target: string, refreshOnEach = true) => {
  return new MintTemplate(target, refreshOnEach);
};

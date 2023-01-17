import { MintTemplate } from "../models/MintTemplate.model";

export const template = (target: string) => {
  return new MintTemplate(target);
};

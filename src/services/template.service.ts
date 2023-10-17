import { MintTemplate } from "../models/MintTemplate.model";

import { I_mTemplate_Options } from "../interfaces/I_mTemplate.interface";

export const template = (
  target: string,
  { refreshOnEach = true, replaceCondition }: I_mTemplate_Options = {}
) => {
  return new MintTemplate(target, { refreshOnEach, replaceCondition });
};

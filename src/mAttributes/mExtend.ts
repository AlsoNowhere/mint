import { MintExtend } from "../models/mint-attributes/MintExtend.model";

export const mExtend = (extension: Object) => {
  return { mExtend: new MintExtend(extension) };
};

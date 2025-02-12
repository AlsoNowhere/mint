import { MintIf } from "../models/mint-attributes/MintIf.model";

export const mIf = (ifValue: string) => {
  return { mIf: new MintIf(ifValue) };
};

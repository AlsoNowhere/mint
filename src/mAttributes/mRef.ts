import { MintRef } from "../models/mint-attributes/MintRef.model";

export const mRef = (refValue: string) => {
  return { mRef: new MintRef(refValue) };
};

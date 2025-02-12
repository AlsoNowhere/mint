import { MintFor } from "../models/mint-attributes/MintFor.model";

export const mFor = (forValue: string) => {
  return { mFor: new MintFor(forValue) };
};

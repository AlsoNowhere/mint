import { MintProps } from "../models/mint-attributes/MintProps.model";

export const mProps = (exceptions: Array<string> = []) => {
  return { mProps: new MintProps(exceptions) };
};

import { MintElement } from "../models/MintElement.model";

let mintElement_index = 0;

export const cloneAttributes = (mintElement: MintElement) => {
  return Object.assign(
    {
      mintElement_index: ++mintElement_index,
    },
    mintElement.attributes || mintElement.props
  );
};

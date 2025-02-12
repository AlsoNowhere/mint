import { IProps } from "../interfaces/IProps.interface";

import { MINT_ERROR } from "../data/constants.data";
import { mintAttributeOrder } from "../data/mint-attributes.data";

const conflicts = [
  ["mIf", "mFor"],
  ["mFor", "mRef"],
];

const resolveConflicts = (keys: Array<string>) => {
  for (let [a, b] of conflicts) {
    if (keys.includes(a) && keys.includes(b)) {
      throw new Error(
        `${MINT_ERROR} attributes -- Cannot have ${a} and ${b} on the same element.`
      );
    }
  }
};

// ** Certain Properties (Component props) and Attributes on Components and Elements need to be
// ** run in a particular order. We create that order here as an Array of strings (Object keys).
export const resolvePropsOrder = (props: IProps) => {
  const keys = Object.keys(props);

  // ** Certain attributes cannot be both on an element, resolve that here.
  resolveConflicts(keys);

  keys.sort(([a], [b]) => {
    return mintAttributeOrder.indexOf(a) - mintAttributeOrder.indexOf(b);
  });

  return keys;
};

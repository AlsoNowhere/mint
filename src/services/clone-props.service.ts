import { MintAttribute } from "../models/mint-attributes/MintAttribute.model";

import { IProps } from "../interfaces/IProps.interface";

// ** Props are defined at the Mint Node level but when we create Mint Elements we
// ** need to make sure these are unique so here we clone the props.
export const cloneProps = ({ props }: { props: IProps }) => {
  const newProps: IProps = {};

  if (!props) {
    return newProps;
  }

  for (let [key, value] of Object.entries(props)) {
    if (value instanceof MintAttribute) {
      // ** In specific examples, such as when cloning a MintNode for use in mFor, we need to make sure
      // ** each MintAttribute is unique.
      newProps[key] = value.cloneAttribute();
    } else {
      newProps[key] = value;
    }
  }

  return newProps;
};

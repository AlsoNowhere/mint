// ** Here we fix a duplication of logic that is for the users' benefit.
// ** Users can define mint attributes by either:
// ** { mIf: mIf("case") }
// ** OR
// ** { ...mIf("case") }
// ** The former produces attributes like this:
// ** { mIf: { mIf: MintIf() } }
// ** Which we simiplify here to:
// ** { mIf: MintIf() }

import { IProps } from "../../../interfaces/IProps.interface";

import { mintAttributesList } from "../../../data/mint-attributes.data";

export const fixProps = (props: IProps | null) => {
  if (props === null) return;
  for (let key of Object.keys(props)) {
    if (mintAttributesList.includes(key)) {
      if (props[key][key]) {
        props[key] = props[key][key];
      }
    }
  }
};

import { generateMRef } from "../../logic/mRef/generateMRef.logic";

import { MintAttribute } from "./MintAttribute.model";

export class MintRef extends MintAttribute {
  constructor(refValue: string) {
    super(() => new MintRef(refValue));

    this.onGenerate = ({ ...args }) => {
      return generateMRef({
        refValue,
        ...args,
      });
    };
  }
}

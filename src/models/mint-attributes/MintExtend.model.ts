import { MintAttribute } from "./MintAttribute.model";

import { generateMExtend } from "../../logic/mExtend/generate-mExtend.logic";

export class MintExtend extends MintAttribute {
  extension: string | Object;

  constructor(extension: Object) {
    super(() => new MintExtend(extension));

    this.extension = extension;

    this.onGenerate = function ({ ...args }) {
      const { extension } = this as MintExtend;
      return generateMExtend({
        extension,
        ...args,
      });
    };
  }
}

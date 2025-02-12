import { generateTextBlueprint } from "../../logic/generate/generate-text-blueprint.logic";
import { refreshTextNode } from "../../logic/refresh/refresh-text-node.logic";
import { renderTextBlueprint } from "../../logic/render/render-text-blueprint.logic";

import { MintNode } from "./MintNode.model";

export class MintText extends MintNode {
  textValue: string;

  constructor(textValue: string) {
    super(null, generateTextBlueprint, renderTextBlueprint, refreshTextNode);

    this.textValue = textValue;
  }
}

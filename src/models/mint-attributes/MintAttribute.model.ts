import { TonRender } from "../../types/MintAttributes/TonRender.type";
import { TonGenerate } from "../../types/MintAttributes/TonGenerate.type";
import { TonRefresh } from "../../types/MintAttributes/TonRefresh.type";

export abstract class MintAttribute {
  constructor(cloneAttribute) {
    this.cloneAttribute = cloneAttribute;
  }

  cloneAttribute: (oldInstance?: MintAttribute) => MintAttribute;

  onGenerate?: TonGenerate;
  onRender?: TonRender;
  onRefresh?: TonRefresh;
}

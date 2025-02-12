import { MintText } from "../mint-nodes/MintText.model";
import { Blueprint } from "./Blueprint.model";

import { IMainScope } from "../../interfaces/IMainScope.interface";
import { IRootScope } from "../../interfaces/IRootScope.interface";

import { TParentBlueprint } from "../../types/TParentBlueprint.type";

type TAttributes = {
  mintNode: MintText;
  element: Text;
  textValue: string;
  scope: IMainScope;
  parentBlueprint: null | TParentBlueprint;
  _rootScope: IRootScope;
};

export class TextBlueprint extends Blueprint {
  element: Text;
  textValue: string;
  _dev: "Text";

  constructor({
    mintNode,
    element,
    textValue,
    scope,
    parentBlueprint,
    _rootScope,
  }: TAttributes) {
    super({
      mintNode,
      scope,
      parentBlueprint,
      _rootScope,
    });

    this.element = element;
    this.textValue = textValue;

    this._dev = "Text";
  }
}

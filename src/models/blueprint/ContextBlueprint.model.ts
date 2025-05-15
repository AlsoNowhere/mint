import { MintContext } from "../mint-nodes/MintContext.model";
import { Blueprint } from "./Blueprint.model";

import { IScope } from "../../interfaces/IScope.interface";
import { IRootScope } from "../../interfaces/IRootScope.interface";

import { TParentBlueprint } from "../../types/TParentBlueprint.type";

type TAttributes = {
  mintNode: MintContext;
  scope: IScope;
  parentBlueprint: null | TParentBlueprint;
  _rootScope: IRootScope;
};

export class ContextBlueprint extends Blueprint {
  fragment: true;

  constructor({ mintNode, scope, parentBlueprint, _rootScope }: TAttributes) {
    super({ mintNode, scope, parentBlueprint, _rootScope });

    this.fragment = true;
  }
}

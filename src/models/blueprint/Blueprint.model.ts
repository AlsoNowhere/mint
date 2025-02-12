import { MintNode } from "../mint-nodes/MintNode.model";

import { IRootScope } from "../../interfaces/IRootScope.interface";
import { IMainScope } from "../../interfaces/IMainScope.interface";
import { IProps } from "../../interfaces/IProps.interface";
import { IAttributes } from "../../interfaces/IAttributes.interface";

import { global } from "../../data/constants.data";

import { TElement } from "../../types/TElement.type";
import { TParentBlueprint } from "../../types/TParentBlueprint.type";

type TArguments = {
  mintNode: MintNode;
  scope: IMainScope;
  parentBlueprint: null | TParentBlueprint;
  _rootScope: IRootScope;
};

export abstract class Blueprint {
  mintNode: MintNode;
  element?: Text | TElement;
  orderedProps?: Array<string>;
  props?: IProps;
  orderedAttributes?: Array<string>;
  attributes?: IAttributes;
  scope: IMainScope;
  parentBlueprint: null | TParentBlueprint;
  _rootScope: IRootScope;
  collection?: Array<Blueprint>;
  childBlueprints?: Array<Blueprint>;
  mintElement_index: number;

  constructor({ mintNode, scope, parentBlueprint, _rootScope }: TArguments) {
    this.mintNode = mintNode;
    this.scope = scope;

    this.parentBlueprint = parentBlueprint;

    this._rootScope = _rootScope;

    this.mintElement_index = ++global.mintElement_index;
  }
}

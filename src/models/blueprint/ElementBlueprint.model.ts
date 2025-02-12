import { MintElement } from "../mint-nodes/MintElement.model";
import { Blueprint } from "./Blueprint.model";

import { IAttributes } from "../../interfaces/IAttributes.interface";
import { IMainScope } from "../../interfaces/IMainScope.interface";
import { IRootScope } from "../../interfaces/IRootScope.interface";

import { TElement } from "../../types/TElement.type";
import { TParentBlueprint } from "../../types/TParentBlueprint.type";

type TAttributes = {
  mintNode: MintElement;
  fragment?: true;
  element?: TElement;
  orderedAttributes: Array<string>;
  attributes: IAttributes;
  scope: IMainScope;
  parentBlueprint: null | TParentBlueprint;
  _rootScope: IRootScope;
  collection?: Array<Blueprint>;
  childBlueprints?: Array<Blueprint>;
};

export class ElementBlueprint extends Blueprint {
  fragment?: true;
  element?: TElement;
  orderedAttributes: Array<string>;
  attributes: IAttributes;
  collection?: Array<Blueprint>;
  childBlueprints?: Array<Blueprint>;
  isSVG: boolean;
  _dev: "Element";

  constructor({
    mintNode,
    fragment,
    element,
    orderedAttributes,
    attributes,
    scope,
    parentBlueprint,
    _rootScope,
    collection,
    childBlueprints,
  }: TAttributes) {
    super({
      mintNode,
      scope,
      parentBlueprint,
      _rootScope,
    });

    if (!!fragment) this.fragment = fragment;
    if (!!element) this.element = element;

    this.orderedAttributes = orderedAttributes;
    this.attributes = attributes;

    if (!!collection) this.collection = collection;
    if (!!childBlueprints) this.childBlueprints = childBlueprints;
    if (element instanceof SVGElement) this.isSVG = true;

    this._dev = "Element";
  }
}

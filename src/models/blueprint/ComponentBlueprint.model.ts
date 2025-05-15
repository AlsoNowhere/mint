import { MintComponent } from "../mint-nodes/MintComponent.model";
import { Blueprint } from "./Blueprint.model";

import { INode } from "../../interfaces/INode.interface";
import { IProps } from "../../interfaces/IProps.interface";
import { IAttributes } from "../../interfaces/IAttributes.interface";
import { IMainScope } from "../../interfaces/IMainScope.interface";
import { IRootScope } from "../../interfaces/IRootScope.interface";

import { TElement } from "../../types/TElement.type";
import { TParentBlueprint } from "../../types/TParentBlueprint.type";

type TAttributes = {
  mintNode: MintComponent;
  fragment?: true;
  element?: TElement;
  orderedProps: Array<string>;
  props: IProps;
  orderedAttributes: Array<string>;
  attributes: IAttributes;
  scope: IMainScope;
  parentBlueprint: null | TParentBlueprint;
  collection?: Array<Blueprint>;
  childBlueprints?: Array<Blueprint>;
  _rootScope: IRootScope;
  contentFor_children?: Array<INode>;
};

export class ComponentBlueprint extends Blueprint {
  fragment?: true;
  element?: TElement;
  orderedProps: Array<string>;
  props: IProps;
  orderedAttributes: Array<string>;
  attributes: IAttributes;
  collection?: Array<Blueprint>;
  childBlueprints?: Array<Blueprint>;
  contentFor_children?: Array<INode>;
  contexts?: Record<string, string | Object>;
  isSVG?: true;
  _dev: "Component";

  constructor({
    mintNode,
    fragment,
    element,
    orderedProps,
    props,
    orderedAttributes,
    attributes,
    scope,
    parentBlueprint,
    collection,
    childBlueprints,
    _rootScope,
    contentFor_children
  }: TAttributes) {
    super({
      mintNode,
      scope,
      parentBlueprint,
      _rootScope
    });

    if (!!fragment) this.fragment = fragment;
    if (!!element) this.element = element;

    this.orderedProps = orderedProps;
    this.props = props;
    this.orderedAttributes = orderedAttributes;
    this.attributes = attributes;

    if (!!collection) this.collection = collection;
    if (!!childBlueprints) this.childBlueprints = childBlueprints;
    if (!!contentFor_children) this.contentFor_children = contentFor_children;
    if (element instanceof SVGElement) this.isSVG = true;

    this._dev = "Component";
  }
}

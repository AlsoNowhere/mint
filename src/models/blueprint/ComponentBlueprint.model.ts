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
  _childrenContent?: Array<INode>;
};

export class ComponentBlueprint extends Blueprint {
  isComponent: true;
  fragment?: true;
  element?: TElement;
  orderedProps: Array<string>;
  props: IProps;
  orderedAttributes: Array<string>;
  attributes: IAttributes;
  collection?: Array<Blueprint>;
  childBlueprints?: Array<Blueprint>;
  _childrenContent?: Array<INode>;
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
    _childrenContent
  }: TAttributes) {
    super({
      mintNode,
      scope,
      parentBlueprint,
      _rootScope
    });
    this.isComponent = true;

    if (!!fragment) this.fragment = fragment;
    if (!!element) this.element = element;

    this.orderedProps = orderedProps;
    this.props = props;
    this.orderedAttributes = orderedAttributes;
    this.attributes = attributes;

    if (!!collection) this.collection = collection;
    if (!!childBlueprints) this.childBlueprints = childBlueprints;
    if (!!_childrenContent) this._childrenContent = _childrenContent;
    if (element instanceof SVGElement) this.isSVG = true;

    this._dev = "Component";
  }
}

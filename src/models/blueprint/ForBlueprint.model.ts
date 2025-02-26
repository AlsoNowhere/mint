import { MintElement } from "../mint-nodes/MintElement.model";
import { MintComponent } from "../mint-nodes/MintComponent.model";
import { Blueprint } from "./Blueprint.model";

import { IMainScope } from "../../interfaces/IMainScope.interface";
import { IProps } from "../../interfaces/IProps.interface";
import { IRootScope } from "../../interfaces/IRootScope.interface";

import { TParentBlueprint } from "../../types/TParentBlueprint.type";
import { ElementBlueprint } from "./ElementBlueprint.model";
import { ComponentBlueprint } from "./ComponentBlueprint.model";
import { TRender } from "../../types/TRender.type";
import { TonRefresh } from "../../types/MintAttributes/TonRefresh.type";
import { TRefresh } from "../../types/TRefresh.type";

type TAttributes = {
  render?: TRender;
  // refresh?: TonRefresh;
  // refresh?: (blueprint: Blueprint) => void;
  refresh?: TRefresh;
  nodeToClone: MintElement | MintComponent;
  fragment?: true;
  orderedProps: Array<string>;
  props: IProps;
  scope: IMainScope;
  parentBlueprint: null | TParentBlueprint;
  _rootScope: IRootScope;
  forListBlueprints: Array<ElementBlueprint | ComponentBlueprint>;
  // collection: Array<Blueprint>;
  isSVG?: true;
};

export class ForBlueprint extends Blueprint {
  mintNode: null;
  nodeToClone: MintElement | MintComponent;
  fragment?: true;
  orderedProps: Array<string>;
  props: IProps;
  forListBlueprints: Array<ElementBlueprint | ComponentBlueprint>;
  // collection: Array<Blueprint>;
  // childBlueprints: undefined;
  isSVG: boolean;
  _dev: "For";

  constructor({
    // mintNode,
    render,
    refresh,
    nodeToClone,
    fragment,
    orderedProps,
    props,
    scope,
    parentBlueprint,
    forListBlueprints,
    // collection,
    _rootScope,
    isSVG,
  }: TAttributes) {
    super({ render, refresh, scope, parentBlueprint, _rootScope });

    this.nodeToClone = nodeToClone;

    if (!!fragment) this.fragment = fragment;

    this.orderedProps = orderedProps;
    this.props = props;
    this.forListBlueprints = forListBlueprints;
    // this.collection = collection;

    if (!!isSVG) this.isSVG = isSVG;

    this._dev = "For";
  }
}

import { IMainScope } from "../../interfaces/IMainScope.interface";
import { INode } from "../../interfaces/INode.interface";
import { IProps } from "../../interfaces/IProps.interface";
import { IRootScope } from "../../interfaces/IRootScope.interface";

import { TElement } from "../TElement.type";
import { TParentBlueprint } from "../TParentBlueprint.type";
import { TShouldExit } from "../TShouldExit.type";

interface IOptions {
  node: INode;
  htmlElement?: TElement;
  orderedProps: Array<string>;
  props: IProps;
  parentScope: IMainScope;
  scope: IMainScope;
  _children: null | Array<INode>;
  parentBlueprint: null | TParentBlueprint;
  _rootScope: IRootScope;
  isSVG: boolean;
  isComponent: boolean;
  isAttribute: boolean;
}

export type TonGenerate<T = {}> = (options: IOptions & T) => TShouldExit;

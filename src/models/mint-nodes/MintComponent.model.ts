import { generateComponentBlueprint } from "../../logic/generate/generate-component-blueprint.logic";
import { renderComponentBlueprint } from "../../logic/render/render-component-blueprint.logic";
import { refreshComponentBlueprint } from "../../logic/refresh/refresh-component-blueprint.logic";
import { cloneContent } from "../../logic/common/clone-content.logic";

import { MintNode } from "./MintNode.model";

import { IConstructorScope } from "../../interfaces/IConstructorScope.interface";
import { IAttributes } from "../../interfaces/IAttributes.interface";
import { IProps } from "../../interfaces/IProps.interface";
import { INode } from "../../interfaces/INode.interface";

import { TProps } from "../../types/TProps.type";

export class MintComponent extends MintNode {
  element?: string;
  collection?: Array<INode>;
  attributes: IAttributes;
  content: Array<INode>;
  scope: null | IConstructorScope;
  propTypes?: Record<string, TProps>;
  orderedProperties?: Array<string>;
  _children: null | Array<INode>;

  constructor(
    element: string,
    attributes: null | IAttributes,
    content: null | Array<INode>,
    scope: null | IConstructorScope
  ) {
    super(
      content,
      generateComponentBlueprint,
      renderComponentBlueprint,
      refreshComponentBlueprint
    );

    this.element = element;
    this.attributes = attributes ?? {};
    this.scope = scope;
    this._children = null;

    if (scope?._propTypes) {
      this.propTypes = scope._propTypes;
    }
  }

  public addChildren(_children: null | Array<INode>) {
    this._children = _children;
  }

  public addProperties(props: null | IProps) {
    this.props = props ?? undefined;
  }

  public clone() {
    const content: Array<INode> = [];
    for (let x of this.content) {
      content.push(cloneContent(x));
    }
    const cloned = new MintComponent(
      this.element ?? "<>",
      Object.assign({}, this.attributes),
      content,
      this.scope
    );

    cloned._children = this._children;
    cloned.props = this.props;

    return cloned;
  }
}

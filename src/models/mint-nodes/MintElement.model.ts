import { cloneContent } from "../../logic/common/clone-content.logic";
import { generateElementBlueprint } from "../../logic/generate/generate-element-blueprint.logic";
import { renderElementBlueprint } from "../../logic/render/render-element-blueprint.logic";
import { refreshElementBlueprint } from "../../logic/refresh/refresh-element-blueprint.logic";

import { MintNode } from "./MintNode.model";

import { IProps } from "../../interfaces/IProps.interface";
import { INode } from "../../interfaces/INode.interface";
import { IAttributes } from "../../interfaces/IAttributes.interface";

export class MintElement extends MintNode {
  element?: string;
  collection?: Array<INode>;
  // props: IProps;
  attributes: IAttributes;
  scope: undefined;

  constructor(
    element: string,
    // props: null | IProps = null,
    attributes: null | IAttributes = null,
    content: null | Array<INode>
  ) {
    super(
      content,
      generateElementBlueprint,
      renderElementBlueprint,
      refreshElementBlueprint
    );

    this.element = element;
    // this.props = props ?? {};
    this.attributes = attributes ?? {};
  }

  public clone() {
    const content: Array<INode> = [];
    for (let x of this.content) {
      content.push(cloneContent(x));
    }
    return new MintElement(
      this.element ?? "<>",
      // Object.assign({}, this.props),
      Object.assign({}, this.attributes),
      content
    );
  }
}

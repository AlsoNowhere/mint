import { cloneContent } from "../../logic/common/clone-content.logic";
import { generateElementBlueprint } from "../../logic/generate/generate-element-blueprint.logic";
import { renderElementBlueprint } from "../../logic/render/render-element-blueprint.logic";
import { refreshElementBlueprint } from "../../logic/refresh/refresh-element-blueprint.logic";

import { MintNode } from "./MintNode.model";

import { IProps } from "../../interfaces/IProps.interface";
import { INode } from "../../interfaces/INode.interface";

export class MintElement extends MintNode {
  element?: string;
  collection?: Array<INode>;
  props: IProps;
  scope: undefined;

  constructor(
    element: string,
    props: null | IProps = null,
    content: null | Array<INode>
  ) {
    super(
      content,
      generateElementBlueprint,
      renderElementBlueprint,
      refreshElementBlueprint
    );

    this.element = element;
    this.props = props ?? {};
  }

  public clone() {
    const content: Array<INode> = [];
    for (let x of this.content) {
      content.push(cloneContent(x));
    }
    return new MintElement(
      this.element ?? "<>",
      Object.assign({}, this.props),
      content
    );
  }
}

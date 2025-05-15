import { MintComponent } from "./mint-nodes/MintComponent.model";
import { MintElement } from "./mint-nodes/MintElement.model";
import { MintTemplate } from "./mint-nodes/MintTemplate.model";
import { MintContext } from "./mint-nodes/MintContext.model";
import { MintText } from "./mint-nodes/MintText.model";

import { INode } from "../interfaces/INode.interface";
import { IProps } from "../interfaces/IProps.interface";

export class CreateNode<T extends Object, U extends MintText | MintElement | MintComponent | MintTemplate | MintContext>
  implements INode<T>
{
  mintNode: U;
  props: null | (T & IProps);
  content: null | Array<INode>;

  constructor(mintNode: U, props: null | (T & IProps) = null, content: null | Array<INode> = null) {
    this.mintNode = mintNode;
    this.props = props;
    this.content = content;
  }
}

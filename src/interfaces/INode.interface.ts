import { MintText } from "../models/mint-nodes/MintText.model";
import { MintElement } from "../models/mint-nodes/MintElement.model";
import { MintComponent } from "../models/mint-nodes/MintComponent.model";
import { MintTemplate } from "../models/mint-nodes/MintTemplate.model";
import { MintContext } from "../models/mint-nodes/MintContext.model";

import { IProps } from "./IProps.interface";

export interface INode<T = {}> {
  mintNode: MintText | MintElement | MintComponent | MintTemplate | MintContext;
  props: null | (T & IProps);
  content: null | Array<INode>;
}

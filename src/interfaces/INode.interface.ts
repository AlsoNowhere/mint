import { MintText } from "../models/mint-nodes/MintText.model";
import { MintElement } from "../models/mint-nodes/MintElement.model";
import { MintComponent } from "../models/mint-nodes/MintComponent.model";
import { MintTemplate } from "../models/mint-nodes/MintTemplate.model";

import { IProps } from "./IProps.interface";

export interface INode<T = {}> {
  mintNode: MintText | MintElement | MintComponent | MintTemplate;
  props: null | (T & IProps);
  content: null | Array<INode>;
}

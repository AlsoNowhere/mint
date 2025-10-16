import { CreateNode } from "../models/CreateNode.model";
import { MintText } from "../models/mint-nodes/MintText.model";
import { MintComponent } from "../models/mint-nodes/MintComponent.model";
import { MintElement } from "../models/mint-nodes/MintElement.model";
import { MintContext } from "../models/mint-nodes/MintContext.model";
import { MintTemplate } from "../models/mint-nodes/MintTemplate.model";

export type TNode<
  T extends Object,
  U extends MintText | MintElement | MintComponent | MintTemplate | MintContext,
> = CreateNode<T, U>;

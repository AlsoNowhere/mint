import { MintElement } from "../models/mint-nodes/MintElement.model";
import { MintComponent } from "../models/mint-nodes/MintComponent.model";
import { MintTemplate } from "../models/mint-nodes/MintTemplate.model";
import { MintContext } from "../models/mint-nodes/MintContext.model";
import { CreateNode } from "../models/CreateNode.model";
import { IProps } from "../interfaces/IProps.interface";
import { TRawContent } from "../types/TRawContent.type";
export declare function node<T extends Object>(element: string, props?: null | (T & IProps), initialContent?: null | TRawContent): CreateNode<T, MintElement>;
export declare function node<T extends Object>(element: MintComponent, props?: null | (T & IProps), initialContent?: null | TRawContent): CreateNode<T, MintComponent>;
export declare function node<T extends Object>(element: MintTemplate): CreateNode<T, MintTemplate>;
export declare function node<T extends Object>(element: MintContext): CreateNode<T, MintContext>;

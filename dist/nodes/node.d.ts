import { MintComponent } from "../models/mint-nodes/MintComponent.model";
import { MintTemplate } from "../models/mint-nodes/MintTemplate.model";
import { IProps } from "../interfaces/IProps.interface";
import { TRawContent } from "../types/TRawContent.type";
import { TNode } from "../types/TNode.type";
export declare const node: <T>(element: string | MintComponent | MintTemplate, props?: (T & IProps) | null, initialContent?: null | TRawContent) => TNode<T>;

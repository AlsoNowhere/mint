import { CreateNode } from "../../models/CreateNode.model";
import { IAttributes } from "../../interfaces/IAttributes.interface";
import { TRawContent } from "../../types/TRawContent.type";
export declare const quickElement: (name: string, attributesOrInitialContent?: null | IAttributes | TRawContent, initialContent?: null | TRawContent) => CreateNode<IAttributes, import("../../mint").MintElement>;

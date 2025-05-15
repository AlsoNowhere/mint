import { MintNode } from "./MintNode.model";
import { INode } from "../../interfaces/INode.interface";
import { TRawContent } from "../../types/TRawContent.type";
export declare class MintContext extends MintNode {
    contexts: Record<string, string | Object>;
    collection: Array<INode>;
    constructor(contexts: Record<string, string | Object>, initialContent: TRawContent);
    addChildren(): void;
    addProperties(): void;
}

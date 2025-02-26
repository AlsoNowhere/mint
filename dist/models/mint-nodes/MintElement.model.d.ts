import { MintNode } from "./MintNode.model";
import { INode } from "../../interfaces/INode.interface";
import { IAttributes } from "../../interfaces/IAttributes.interface";
export declare class MintElement extends MintNode {
    element?: string;
    collection?: Array<INode>;
    attributes: IAttributes;
    scope: undefined;
    constructor(element: string, attributes: IAttributes | null | undefined, content: null | Array<INode>);
    clone(): MintElement;
}

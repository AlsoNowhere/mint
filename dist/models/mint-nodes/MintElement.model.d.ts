import { MintNode } from "./MintNode.model";
import { IProps } from "../../interfaces/IProps.interface";
import { INode } from "../../interfaces/INode.interface";
export declare class MintElement extends MintNode {
    element?: string;
    collection?: Array<INode>;
    props: IProps;
    scope: undefined;
    constructor(element: string, props: IProps | null | undefined, content: null | Array<INode>);
    clone(): MintElement;
}

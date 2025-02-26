import { MintNode } from "./MintNode.model";
import { IConstructorScope } from "../../interfaces/IConstructorScope.interface";
import { IAttributes } from "../../interfaces/IAttributes.interface";
import { INode } from "../../interfaces/INode.interface";
import { TProps } from "../../types/TProps.type";
export declare class MintComponent extends MintNode {
    element?: string;
    collection?: Array<INode>;
    attributes: IAttributes;
    content: Array<INode>;
    scope: null | IConstructorScope;
    propTypes?: Record<string, TProps>;
    orderedProperties?: Array<string>;
    constructor(element: string, attributes: null | IAttributes, content: null | Array<INode>, scope: null | IConstructorScope);
    clone(): MintComponent;
}

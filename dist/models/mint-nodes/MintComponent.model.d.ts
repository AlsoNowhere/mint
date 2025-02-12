import { MintNode } from "./MintNode.model";
import { IConstructorScope } from "../../interfaces/IConstructorScope.interface";
import { IAttributes } from "../../interfaces/IAttributes.interface";
import { IProps } from "../../interfaces/IProps.interface";
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
    _children: null | Array<INode>;
    constructor(element: string, attributes: null | IAttributes, content: null | Array<INode>, scope: null | IConstructorScope);
    addChildren(_children: null | Array<INode>): void;
    addProperties(props: null | IProps): void;
    clone(): MintComponent;
}

import { MintNode } from "./MintNode.model";
import { IConstructorScope } from "../interfaces/IConstructorScope.interface";
import { IElement } from "../interfaces/IElement.interface";
import { TProps } from "../types/TProps.type";
export declare class MintComponent extends MintNode {
    mintElement: IElement;
    scope: null | IConstructorScope;
    propTypes?: Record<string, TProps>;
    constructor(mintElement: IElement, scope: null | IConstructorScope);
}

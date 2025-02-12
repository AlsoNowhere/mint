import { MintNode } from "./MintNode.model";
import { IScope } from "../interfaces/IScope.interface";
import { IRootScope } from "../interfaces/IRootScope.interface";
import { TElement } from "../types/TElement.type";
import { TOrderedProperties } from "../types/TOrderedProperties.type";
interface ICommonBlueprint {
    mintNode: MintNode;
    childBlueprints?: null | Array<Blueprint>;
    parentBlueprint: null | Blueprint;
    rootScope: IRootScope;
}
type TArguments = ICommonBlueprint & ({
    element: Text;
    componentElement?: never;
    contentElements?: never;
    textValue: string;
    templateState?: never;
    orderedAttributes?: never;
    orderedProperties?: never;
    scope: IScope;
    contentFor_children?: never;
} | {
    element?: never;
    componentElement: TElement;
    contentElements?: null | Array<Blueprint>;
    textValue?: never;
    templateState?: never;
    orderedAttributes: null | TOrderedProperties;
    orderedProperties: null | TOrderedProperties;
    scope: IScope;
    contentFor_children: Array<Blueprint>;
} | {
    element: TElement;
    componentElement?: never;
    contentElements?: null | Array<Blueprint>;
    textValue?: never;
    templateState?: never;
    orderedAttributes?: never;
    orderedProperties: null | TOrderedProperties;
    scope: IScope;
    contentFor_children?: never;
} | {
    element?: never;
    componentElement?: never;
    contentElements?: never;
    textValue?: never;
    templateState?: never;
    orderedAttributes?: never;
    orderedProperties: null | TOrderedProperties;
    scope?: never;
    contentFor_children?: never;
} | {
    element?: never;
    componentElement?: never;
    contentElements: Array<Blueprint>;
    textValue?: never;
    templateState?: never;
    orderedAttributes?: never;
    orderedProperties: TOrderedProperties;
    scope: IScope;
    contentFor_children?: never;
} | {
    element?: never;
    componentElement?: never;
    contentElements?: never;
    textValue?: never;
    templateState: null | string | number | boolean | Object;
    orderedAttributes?: never;
    orderedProperties?: never;
    scope: IScope;
    contentFor_children?: never;
});
export declare class Blueprint implements ICommonBlueprint {
    textNode?: Text;
    element?: TElement;
    componentElement?: TElement;
    contentElements: null | Array<Blueprint>;
    isSVG: boolean;
    textValue?: string;
    templateState?: any;
    mintNode: MintNode;
    orderedAttributes?: null | TOrderedProperties;
    orderedProperties?: null | TOrderedProperties;
    scope?: IScope;
    rootScope: IRootScope;
    childBlueprints?: null | Array<Blueprint>;
    parentBlueprint: null | Blueprint;
    contentFor_children?: Array<Blueprint>;
    _dev: "Text" | "Component" | "Element" | "IF" | "FOR" | "TEMPLATE";
    constructor({ element, componentElement, contentElements, textValue, templateState, mintNode, orderedAttributes, orderedProperties, scope, rootScope, childBlueprints, parentBlueprint, contentFor_children, }: TArguments);
    getElement(): TElement;
}
export {};

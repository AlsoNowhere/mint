import { MintComponent } from "../mint-nodes/MintComponent.model";
import { Blueprint } from "./Blueprint.model";
import { INode } from "../../interfaces/INode.interface";
import { IProps } from "../../interfaces/IProps.interface";
import { IAttributes } from "../../interfaces/IAttributes.interface";
import { IMainScope } from "../../interfaces/IMainScope.interface";
import { IRootScope } from "../../interfaces/IRootScope.interface";
import { TElement } from "../../types/TElement.type";
import { TParentBlueprint } from "../../types/TParentBlueprint.type";
type TAttributes = {
    mintNode: MintComponent;
    fragment?: true;
    element?: TElement;
    orderedProps: Array<string>;
    props: IProps;
    orderedAttributes: Array<string>;
    attributes: IAttributes;
    scope: IMainScope;
    parentBlueprint: null | TParentBlueprint;
    collection?: Array<Blueprint>;
    childBlueprints?: Array<Blueprint>;
    _rootScope: IRootScope;
    contentFor_children?: Array<INode>;
};
export declare class ComponentBlueprint extends Blueprint {
    fragment?: true;
    element?: TElement;
    orderedProps: Array<string>;
    props: IProps;
    orderedAttributes: Array<string>;
    attributes: IAttributes;
    collection?: Array<Blueprint>;
    childBlueprints?: Array<Blueprint>;
    contentFor_children?: Array<INode>;
    isSVG?: true;
    _dev: "Component";
    constructor({ mintNode, fragment, element, orderedProps, props, orderedAttributes, attributes, scope, parentBlueprint, collection, childBlueprints, _rootScope, contentFor_children, }: TAttributes);
}
export {};

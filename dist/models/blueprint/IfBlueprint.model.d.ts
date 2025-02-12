import { MintElement } from "../mint-nodes/MintElement.model";
import { MintComponent } from "../mint-nodes/MintComponent.model";
import { Blueprint } from "./Blueprint.model";
import { INode } from "../../interfaces/INode.interface";
import { IProps } from "../../interfaces/IProps.interface";
import { IMainScope } from "../../interfaces/IMainScope.interface";
import { IRootScope } from "../../interfaces/IRootScope.interface";
import { TParentBlueprint } from "../../types/TParentBlueprint.type";
type TAttributes = {
    mintNode: MintElement | MintComponent;
    orderedProps: Array<string>;
    props: IProps;
    scope: IMainScope;
    parentBlueprint: null | TParentBlueprint;
    _rootScope: IRootScope;
    content: null | Array<INode>;
    isSVG: boolean;
};
export declare class IfBlueprint extends Blueprint {
    orderedProps: Array<string>;
    props: IProps;
    content: null | Array<INode>;
    isSVG?: true;
    _dev: "If";
    constructor({ mintNode, orderedProps, props, scope, parentBlueprint, _rootScope, content, isSVG, }: TAttributes);
}
export {};

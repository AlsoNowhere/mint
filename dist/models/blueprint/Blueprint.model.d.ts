import { MintNode } from "../mint-nodes/MintNode.model";
import { IRootScope } from "../../interfaces/IRootScope.interface";
import { IMainScope } from "../../interfaces/IMainScope.interface";
import { IProps } from "../../interfaces/IProps.interface";
import { IAttributes } from "../../interfaces/IAttributes.interface";
import { TElement } from "../../types/TElement.type";
import { TParentBlueprint } from "../../types/TParentBlueprint.type";
import { TRender } from "../../types/TRender.type";
import { TRefresh } from "../../types/TRefresh.type";
type TArguments = {
    mintNode?: null | MintNode;
    render?: null | TRender;
    refresh?: null | TRefresh;
    scope: IMainScope;
    parentBlueprint: null | TParentBlueprint;
    _rootScope: IRootScope;
};
export declare abstract class Blueprint {
    mintNode: null | MintNode;
    render: null | TRender;
    refresh: null | TRefresh;
    element?: Text | TElement;
    orderedProps?: Array<string>;
    props?: IProps;
    orderedAttributes?: Array<string>;
    attributes?: IAttributes;
    scope: IMainScope;
    parentBlueprint: null | TParentBlueprint;
    _rootScope: IRootScope;
    collection?: Array<Blueprint>;
    childBlueprints?: Array<Blueprint>;
    mintElement_index: number;
    constructor({ mintNode, render, refresh, scope, parentBlueprint, _rootScope, }: TArguments);
}
export {};

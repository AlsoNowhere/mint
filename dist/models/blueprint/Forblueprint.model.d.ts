import { MintElement } from "../mint-nodes/MintElement.model";
import { MintComponent } from "../mint-nodes/MintComponent.model";
import { Blueprint } from "./Blueprint.model";
import { IMainScope } from "../../interfaces/IMainScope.interface";
import { IProps } from "../../interfaces/IProps.interface";
import { IRootScope } from "../../interfaces/IRootScope.interface";
import { TParentBlueprint } from "../../types/TParentBlueprint.type";
import { ElementBlueprint } from "./ElementBlueprint.model";
import { ComponentBlueprint } from "./ComponentBlueprint.model";
import { TRender } from "../../types/TRender.type";
import { TRefresh } from "../../types/TRefresh.type";
type TAttributes = {
    render?: TRender;
    refresh?: TRefresh;
    nodeToClone: MintElement | MintComponent;
    fragment?: true;
    orderedProps: Array<string>;
    props: IProps;
    scope: IMainScope;
    parentBlueprint: null | TParentBlueprint;
    _rootScope: IRootScope;
    forListBlueprints: Array<ElementBlueprint | ComponentBlueprint>;
    isSVG?: true;
};
export declare class ForBlueprint extends Blueprint {
    mintNode: null;
    nodeToClone: MintElement | MintComponent;
    fragment?: true;
    orderedProps: Array<string>;
    props: IProps;
    forListBlueprints: Array<ElementBlueprint | ComponentBlueprint>;
    isSVG: boolean;
    _dev: "For";
    constructor({ render, refresh, nodeToClone, fragment, orderedProps, props, scope, parentBlueprint, forListBlueprints, _rootScope, isSVG, }: TAttributes);
}
export {};

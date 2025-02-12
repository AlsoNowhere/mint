import { MintElement } from "../mint-nodes/MintElement.model";
import { MintComponent } from "../mint-nodes/MintComponent.model";
import { Blueprint } from "./Blueprint.model";
import { IMainScope } from "../../interfaces/IMainScope.interface";
import { IProps } from "../../interfaces/IProps.interface";
import { IRootScope } from "../../interfaces/IRootScope.interface";
import { TParentBlueprint } from "../../types/TParentBlueprint.type";
type TAttributes = {
    mintNode: MintElement | MintComponent;
    fragment?: true;
    orderedProps: Array<string>;
    props: IProps;
    scope: IMainScope;
    parentBlueprint: null | TParentBlueprint;
    _rootScope: IRootScope;
    collection: Array<Blueprint>;
    isSVG?: true;
};
export declare class ForBlueprint extends Blueprint {
    fragment?: true;
    orderedProps: Array<string>;
    props: IProps;
    collection: Array<Blueprint>;
    childBlueprints: undefined;
    isSVG: boolean;
    _dev: "For";
    constructor({ mintNode, fragment, orderedProps, props, scope, parentBlueprint, collection, _rootScope, isSVG, }: TAttributes);
}
export {};

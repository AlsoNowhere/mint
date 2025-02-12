import { IScope } from "../interfaces/IScope.interface";
import { IRootScope } from "../interfaces/IRootScope.interface";
import { MintElement } from "./MintElement.model";
import { Blueprint } from "./Blueprint.model";
type TArguments = {
    mintElement: MintElement | string;
    orderedAttributes: Array<[string, any]>;
    parentBlueprint: null | Blueprint;
    scope: IScope;
    isSVG: boolean;
    rootScope: IRootScope;
};
export declare class IF_Blueprint {
    mintElement: MintElement | string;
    orderedAttributes: Array<[string, any]>;
    parentBlueprint: null | Blueprint;
    scope: IScope;
    isSVG: boolean;
    rootScope: IRootScope;
    constructor({ mintElement, orderedAttributes, parentBlueprint, scope, isSVG, rootScope, }: TArguments);
}
export {};

import { Blueprint } from "./Blueprint.model";
import { MintElement } from "./MintElement.model";
import { IRootScope } from "../interfaces/IRootScope.interface";
import { IScope } from "../interfaces/IScope.interface";
type TArguments = {
    mintElement: MintElement | string;
    orderedAttributes: Array<[string, any]>;
    parentBlueprint: null | Blueprint;
    scope: IScope;
    rootScope: IRootScope;
    isSVG: boolean;
    isComponent: boolean;
};
export declare class FOR_Blueprint {
    mintElement: MintElement | string;
    orderedAttributes: Array<[string, any]>;
    parentBlueprint: null | Blueprint;
    scope: IScope;
    isSVG: boolean;
    isComponent: boolean;
    rootScope: IRootScope;
    constructor({ mintElement, orderedAttributes, parentBlueprint, scope, rootScope, isSVG, isComponent, }: TArguments);
}
export {};

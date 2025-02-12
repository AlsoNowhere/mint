import { Blueprint } from "../../../models/Blueprint.model";
import { MintElement } from "../../../models/MintElement.model";
import { IRootScope } from "../../../interfaces/IRootScope.interface";
import { IScope } from "../../../interfaces/IScope.interface";
export declare const generateForBlueprint: (mintElement: MintElement, parentBlueprint: null | Blueprint, parentScope: IScope, data: Blueprint | Object | string | number, index: number, { rootScope, isSVG, }: {
    rootScope: IRootScope;
    isSVG: boolean;
}) => Blueprint;

import { MintElement } from "../../models/MintElement.model";
import { Blueprint } from "../../models/Blueprint.model";
import { IScope } from "../../interfaces/IScope.interface";
export declare const generateElementBlueprint: (mintElement: MintElement, parentBlueprint: null | Blueprint, rootScope: IScope, { isSVG }: {
    isSVG: boolean;
}) => Blueprint;

import { Blueprint } from "../../models/Blueprint.model";
import { IScope } from "../../interfaces/IScope.interface";
import { IRootScope } from "../../interfaces/IRootScope.interface";
import { TMintContent } from "../../types/TMintContent.type";
export declare const generateBlueprints: (elements: TMintContent | Array<TMintContent>, parentBlueprint: null | Blueprint, scope: IScope, { rootScope, isSVG, }: {
    rootScope: IRootScope;
    isSVG?: boolean | undefined;
}) => Array<Blueprint>;

import { IMainScope } from "./IMainScope.interface";
import { IRootScope } from "./IRootScope.interface";
export interface IBlueprintExtensions {
    rootScope: IRootScope;
    isSVG: boolean;
    useGivenScope?: IMainScope;
}

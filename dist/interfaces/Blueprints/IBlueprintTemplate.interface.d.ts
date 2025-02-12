import { Blueprint } from "../../models/blueprint/Blueprint.model";
import { ICommonBlueprint } from "./ICommonBlueprint.interface";
import { IScope } from "../IScope.interface";
export interface IBlueprintTemplate extends ICommonBlueprint {
    contentElements: null | Array<Blueprint>;
    templateState: null | string | number | boolean | Object;
    scope: IScope;
    parentBlueprint: Blueprint;
    _dev: "TEMPLATE";
}

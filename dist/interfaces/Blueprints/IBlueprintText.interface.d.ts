import { IScope } from "../IScope.interface";
import { ICommonBlueprint } from "./ICommonBlueprint.interface";
export interface IBlueprintText extends ICommonBlueprint {
    textNode: Text;
    textValue: string;
    scope: IScope;
    _dev: "Text";
}

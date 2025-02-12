import { Blueprint } from "../../models/blueprint/Blueprint.model";
import { IScope } from "../IScope.interface";
import { ICommonBlueprint } from "./ICommonBlueprint.interface";
import { TElement } from "../../types/TElement.type";
import { TOrderedProperties } from "../../types/TOrderedProperties.type";
export interface IBlueprintElement extends ICommonBlueprint {
    element: TElement;
    contentElements?: null | Array<Blueprint>;
    orderedAttributes: null | TOrderedProperties;
    scope: IScope;
    _dev: "Element";
    getElement: () => TElement;
}

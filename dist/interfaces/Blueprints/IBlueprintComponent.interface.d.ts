import { Blueprint } from "../../models/blueprint/Blueprint.model";
import { ICommonBlueprint } from "./ICommonBlueprint.interface";
import { IScope } from "../IScope.interface";
import { TElement } from "../../types/TElement.type";
import { TOrderedProperties } from "../../types/TOrderedProperties.type";
export interface IBlueprintComponent extends ICommonBlueprint {
    componentElement: TElement;
    contentElements: null | Array<Blueprint>;
    orderedAttributes: null | TOrderedProperties;
    orderedProperties: null | TOrderedProperties;
    scope: IScope;
    parentBlueprint: Blueprint;
    contentFor_children: Array<Blueprint>;
    _dev: "Component";
    getElement: () => TElement;
}

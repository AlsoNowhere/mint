import { Blueprint } from "../../models/blueprint/Blueprint.model";
import { ICommonBlueprint } from "./ICommonBlueprint.interface";
import { TOrderedProperties } from "../../types/TOrderedProperties.type";
export interface IBlueprintIf extends ICommonBlueprint {
    orderedAttributes: null | TOrderedProperties;
    parentBlueprint: Blueprint;
}

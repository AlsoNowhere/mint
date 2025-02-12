import { ElementBlueprint } from "../../models/blueprint/ElementBlueprint.model";
import { ComponentBlueprint } from "../../models/blueprint/ComponentBlueprint.model";
import { IfBlueprint } from "../../models/blueprint/IfBlueprint.model";
export declare const getParentChildBlueprints: (blueprint: ElementBlueprint | ComponentBlueprint | IfBlueprint) => {
    parentChildBlueprints: any;
    blueprintIndex: any;
};

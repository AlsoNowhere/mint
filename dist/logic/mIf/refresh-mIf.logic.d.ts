import { IfBlueprint } from "../../models/blueprint/IfBlueprint.model";
import { ElementBlueprint } from "../../models/blueprint/ElementBlueprint.model";
import { ComponentBlueprint } from "../../models/blueprint/ComponentBlueprint.model";
import { I_mIf } from "../../interfaces/I_mIf.interface";
import { TElement } from "../../types/TElement.type";
export declare const refreshMIf: (mIf: I_mIf, blueprint: ElementBlueprint | ComponentBlueprint | IfBlueprint, parentElement: TElement, options: {
    newlyInserted: boolean;
}) => {
    condition: boolean;
    value: ElementBlueprint | ComponentBlueprint | IfBlueprint;
} | {
    condition: boolean;
    value: undefined;
};

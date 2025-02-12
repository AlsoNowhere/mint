import { IfBlueprint } from "../../../models/blueprint/IfBlueprint.model";
import { ElementBlueprint } from "../../../models/blueprint/ElementBlueprint.model";
import { ComponentBlueprint } from "../../../models/blueprint/ComponentBlueprint.model";
import { I_mIf } from "../../../interfaces/I_mIf.interface";
import { TElement } from "../../../types/TElement.type";
export declare const refreshMIf: (parentElement: TElement, blueprint: ElementBlueprint | ComponentBlueprint | IfBlueprint, blueprintIndex: number, mIf: I_mIf) => {
    newState?: boolean | undefined;
};

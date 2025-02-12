import { ForBlueprint } from "../../../models/blueprint/ForBlueprint.model";
import { I_mFor } from "../../../interfaces/I_mFor.interface";
export declare const refreshMFor: (blueprint: ForBlueprint, blueprintIndex: number, { mFor, inserted }: {
    mFor: I_mFor;
    inserted: boolean;
}) => void;

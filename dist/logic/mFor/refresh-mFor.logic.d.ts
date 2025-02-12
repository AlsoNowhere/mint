import { ForBlueprint } from "../../models/blueprint/ForBlueprint.model";
import { I_mFor } from "../../interfaces/I_mFor.interface";
import { TShouldExit } from "../../types/TShouldExit.type";
export declare const refreshMFor: (blueprint: ForBlueprint, blueprintIndex: number, { _mFor, newlyInserted }: {
    _mFor: I_mFor;
    newlyInserted: boolean;
}) => TShouldExit;

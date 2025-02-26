import { MintAttribute } from "./MintAttribute.model";
import { ForBlueprint } from "../blueprint/ForBlueprint.model";
import { I_mFor } from "../../interfaces/I_mFor.interface";
export declare class MintFor extends MintAttribute {
    _mFor: I_mFor;
    generated: boolean;
    blueprint: ForBlueprint;
    constructor(forValue: string);
}

import { MintAttribute } from "../MintAttribute.model";
import { Blueprint } from "../Blueprint.model";
import { I_mFor } from "../../interfaces/I_mFor.interface";
export declare class MintFor extends MintAttribute {
    mFor: I_mFor;
    blueprint: Blueprint;
    constructor(forValue: string);
}

import { MintAttribute } from "../MintAttribute.model";
import { Blueprint } from "../Blueprint.model";
import { I_mIf } from "../../interfaces/I_mIf.interface";
export declare class MintIf extends MintAttribute {
    mIf: I_mIf;
    blueprint: Blueprint;
    constructor(ifValue: string);
}

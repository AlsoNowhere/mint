import { MintAttribute } from "./MintAttribute.model";
import { Blueprint } from "../blueprint/Blueprint.model";
import { I_mIf } from "../../interfaces/I_mIf.interface";
export declare class MintIf extends MintAttribute {
    _mIf: I_mIf;
    blueprint: Blueprint;
    constructor(ifValue: string);
}

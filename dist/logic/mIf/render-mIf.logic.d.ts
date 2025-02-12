import { Blueprint } from "../../models/blueprint/Blueprint.model";
import { I_mIf } from "../../interfaces/I_mIf.interface";
export declare const renderMIf: (blueprint: Blueprint, mIf: I_mIf) => {
    condition: boolean;
    value: undefined;
} | {
    condition: boolean;
    value: Blueprint;
};

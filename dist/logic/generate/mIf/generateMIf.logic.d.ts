import { MintElement } from "../../../models/mint-nodes/MintElement.model";
import { MintComponent } from "../../../models/mint-nodes/MintComponent.model";
import { IScope } from "../../../interfaces/IScope.interface";
import { I_mIf } from "../../../interfaces/I_mIf.interface";
export declare const generateMIf: (mintNode: MintElement | MintComponent, _ifValue: string, parentScope: IScope) => I_mIf;

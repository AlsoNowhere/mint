import { MintElement } from "../models/mint-nodes/MintElement.model";
import { MintComponent } from "../models/mint-nodes/MintComponent.model";
import { IMainScope } from "./IMainScope.interface";
export interface I_mIf {
    inverse: boolean;
    ifValue: string;
    state: boolean;
    scope: IMainScope;
    blueprinted: boolean;
    mintNode?: MintElement | MintComponent;
}

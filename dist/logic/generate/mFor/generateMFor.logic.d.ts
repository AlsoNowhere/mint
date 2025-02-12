import { MintElement } from "../../../models/mint-nodes/MintElement.model";
import { MintComponent } from "../../../models/mint-nodes/MintComponent.model";
import { I_mFor } from "../../../interfaces/I_mFor.interface";
import { IRootScope } from "../../../interfaces/IRootScope.interface";
import { FOR_Type } from "../../../enum/FOR_Type.enum";
import { TParentBlueprint } from "../../../types/TParentBlueprint.type";
export declare const generateMFor: (forKey: string, forValue: string, mintNode: MintElement | MintComponent, parentBlueprint: null | TParentBlueprint, rootScope: IRootScope, isSVG: boolean, mForType?: FOR_Type) => I_mFor;

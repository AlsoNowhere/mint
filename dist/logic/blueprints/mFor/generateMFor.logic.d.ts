import { MintElement } from "../../../models/MintElement.model";
import { Blueprint } from "../../../models/Blueprint.model";
import { IScope } from "../../../interfaces/IScope.interface";
import { I_mFor } from "../../../interfaces/I_mFor.interface";
import { IBlueprintExtensions } from "../../../interfaces/IBlueprintExtensions.interface";
import { FOR_Type } from "../../../enum/FOR_Type.enum";
export declare const generateMFor: (forKey: string, forValue: string, mintElement: MintElement, scope: IScope, parentBlueprint: null | Blueprint, { rootScope, mForType, isSVG, }: {
    mForType?: FOR_Type | undefined;
} & IBlueprintExtensions) => I_mFor;

import { MintElement } from "../../../models/MintElement.model";
import { Blueprint } from "../../../models/Blueprint.model";
import { IScope } from "../../../interfaces/IScope.interface";
import { IBlueprintExtensions } from "../../../interfaces/IBlueprintExtensions.interface";
export declare const generateForBlueprints: (mintElement: MintElement, parentBlueprint: null | Blueprint, parentScope: IScope, forData: Array<Blueprint | Object | string | number>, { rootScope, isSVG }: IBlueprintExtensions) => Array<Blueprint>;

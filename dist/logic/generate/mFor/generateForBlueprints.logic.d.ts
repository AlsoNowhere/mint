import { MintElement } from "../../../models/MintElement.model";
import { Blueprint } from "../../../models/Blueprint.model";
import { IBlueprintComponent } from "../../../interfaces/Blueprints/IBlueprintComponent.interface";
import { IBlueprintElement } from "../../../interfaces/Blueprints/IBlueprintElement.interface";
import { IRootScope } from "../../../interfaces/IRootScope.interface";
export declare const generateForBlueprints: (mintElement: MintElement, parentBlueprint: null | Blueprint, forData: Array<Blueprint | Object | string | number>, rootScope: IRootScope, isSVG: boolean) => (IBlueprintElement | IBlueprintComponent)[];

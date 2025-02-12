import { Blueprint } from "../../models/blueprint/Blueprint.model";
import { MintNode } from "../../models/MintNode.model";
import { IRootScope } from "../IRootScope.interface";
export interface ICommonBlueprint {
    isSVG: boolean;
    mintNode: MintNode;
    childBlueprints?: null | Array<Blueprint>;
    rootScope: IRootScope;
}

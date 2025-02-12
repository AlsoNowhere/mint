import { Blueprint } from "../../../models/blueprint/Blueprint.model";
import { MintElement } from "../../../models/mint-nodes/MintElement.model";
import { MintComponent } from "../../../models/mint-nodes/MintComponent.model";
import { ElementBlueprint } from "../../../models/blueprint/ElementBlueprint.model";
import { ComponentBlueprint } from "../../../models/blueprint/ComponentBlueprint.model";
import { IRootScope } from "../../../interfaces/IRootScope.interface";
import { TParentBlueprint } from "../../../types/TParentBlueprint.type";
export declare const generateForBlueprint: (mintNode: MintElement | MintComponent, parentBlueprint: null | TParentBlueprint, data: Blueprint | Object | string | number, index: number, rootScope: IRootScope, isSVG?: boolean) => ComponentBlueprint | ElementBlueprint;

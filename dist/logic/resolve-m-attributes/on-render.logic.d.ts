import { Blueprint } from "../../models/blueprint/Blueprint.model";
import { TShouldExit } from "../../types/TShouldExit.type";
import { TElement } from "../../types/TElement.type";
export declare const resolveMAttributesOnRender: (blueprint: Blueprint, parentElement: TElement, parentChildBlueprints: Array<Blueprint>, blueprintIndex: number) => TShouldExit;

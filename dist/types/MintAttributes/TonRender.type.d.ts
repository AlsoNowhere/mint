import { Blueprint } from "../../models/blueprint/Blueprint.model";
import { TElement } from "../TElement.type";
import { TShouldExit } from "../TShouldExit.type";
export type TonRender = (blueprint: Blueprint, parentElement: TElement, parentChildBlueprints: Array<Blueprint>, blueprintIndex: number) => TShouldExit;

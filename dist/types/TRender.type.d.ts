import { Blueprint } from "../models/blueprint/Blueprint.model";
import { TElement } from "./TElement.type";
export type TRender = (blueprint: Blueprint, parentElement: TElement, parentChildBlueprints: Array<Blueprint>, blueprintIndex: number) => void;

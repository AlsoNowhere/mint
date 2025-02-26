import { Blueprint } from "../../models/blueprint/Blueprint.model";
import { ForBlueprint } from "../../models/blueprint/ForBlueprint.model";
import { TElement } from "../../types/TElement.type";
import { TShouldExit } from "../../types/TShouldExit.type";
export declare const renderFor: (blueprint: ForBlueprint, childBlueprints: Array<Blueprint>, parentElement: TElement, blueprintIndex: number) => TShouldExit;

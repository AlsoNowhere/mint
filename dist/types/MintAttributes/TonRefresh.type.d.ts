import { Blueprint } from "../../models/blueprint/Blueprint.model";
import { TElement } from "../TElement.type";
import { TShouldExit } from "../TShouldExit.type";
export type TonRefresh = (blueprint: Blueprint, parentElement: TElement, options: {
    newlyInserted: boolean;
}) => TShouldExit;

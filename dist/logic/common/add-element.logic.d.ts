import { Blueprint } from "../../models/blueprint/Blueprint.model";
import { TElement } from "../../types/TElement.type";
export declare const addElement: (element: TElement | Text, parentElement: TElement, blueprintsList: Array<Blueprint>, blueprintIndex: number) => void;

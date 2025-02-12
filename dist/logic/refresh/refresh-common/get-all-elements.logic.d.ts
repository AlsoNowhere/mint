import { Blueprint } from "../../../models/blueprint/Blueprint.model";
import { TElement } from "../../../types/TElement.type";
export declare const getAllElements: (blueprints: Array<Blueprint>) => (Text | TElement)[];

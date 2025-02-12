import { Blueprint } from "../models/blueprint/Blueprint.model";
import { IRootScope } from "./IRootScope.interface";
import { TElement } from "../types/TElement.type";
export interface IApp {
    rootElement: TElement;
    scope: Array<Blueprint>;
    rootScope: IRootScope;
}

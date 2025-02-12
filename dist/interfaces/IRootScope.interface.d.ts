import { Blueprint } from "../models/blueprint/Blueprint.model";
import { IMainScope } from "./IMainScope.interface";
import { TComponentResovler } from "../types/TComponentResolver.type";
import { TElement } from "../types/TElement.type";
export interface IRootScope extends IMainScope {
    _isRootScope: true;
    _rootElement: TElement;
    _rootChildBlueprints: Array<Blueprint>;
    componentResolvers?: Array<TComponentResovler>;
}

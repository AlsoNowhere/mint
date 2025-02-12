import { Blueprint } from "../../models/blueprint/Blueprint.model";
import { IMainScope } from "../../interfaces/IMainScope.interface";
export declare const getRootElements: (scopeOrBlueprint: IMainScope | Blueprint) => Blueprint[];

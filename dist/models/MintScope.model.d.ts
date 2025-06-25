import { Store } from "../store/Store";
import { Blueprint } from "./blueprint/Blueprint.model";
import { IScope } from "../interfaces/IScope.interface";
import { IRootScope } from "../interfaces/IRootScope.interface";
import { TLifecycle } from "../types/TLifecycle.type";
export declare class MintScope implements IScope {
    onpreblueprint?: TLifecycle;
    oninit?: TLifecycle;
    oninsert?: TLifecycle;
    oneach?: TLifecycle;
    onafterinsert?: TLifecycle;
    onaftereach?: TLifecycle;
    onremove?: TLifecycle;
    _mintBlueprint: Blueprint;
    _rootScope: IRootScope;
    _store?: Store;
    constructor();
}

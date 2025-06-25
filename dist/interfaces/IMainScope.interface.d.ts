import { TLifecycle } from "../types/TLifecycle.type";
export interface IMainScope {
    onpreblueprint?: TLifecycle;
    oninit?: TLifecycle;
    oninsert?: TLifecycle;
    oneach?: TLifecycle;
    onafterinsert?: TLifecycle;
    onaftereach?: TLifecycle;
    onremove?: TLifecycle;
    [x: string]: any;
}

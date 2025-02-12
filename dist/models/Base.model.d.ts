import { Store } from "../store/Store";
import { Blueprint } from "./Blueprint.model";
import { IScope } from "../interfaces/IScope.interface";
export declare class MintScope implements IScope {
    _store?: Store;
    onpreblueprint?: Function;
    oninit?: Function;
    oninsert?: Function;
    oneach?: Function;
    onafterinsert?: Function;
    _component?: IScope | null;
    _mintBlueprint?: Blueprint;
    constructor();
}

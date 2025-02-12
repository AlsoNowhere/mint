import { Store } from "../../store/Store";
import { IMainScope } from "../../interfaces/IMainScope.interface";
export declare abstract class ScopeTransformer {
    transform: (scope: IMainScope | Store, key: string) => void;
    constructor(transform: (scope: IMainScope, key: string) => void);
}

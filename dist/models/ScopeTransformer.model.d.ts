import { IScope } from "../interfaces/IScope.interface";
export declare abstract class ScopeTransformer {
    transform: (scope: IScope, key: string) => void;
    constructor(transform: (scope: IScope, key: string) => void);
}

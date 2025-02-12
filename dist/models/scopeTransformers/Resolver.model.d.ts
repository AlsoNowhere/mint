import { ScopeTransformer } from "../ScopeTransformer.model";
export declare class Resolver<T = any> extends ScopeTransformer {
    callback: () => T;
    constructor(callback: string | (() => T));
}

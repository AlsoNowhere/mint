import { IScope } from "../interfaces/IScope.interface";
import { IStore } from "../interfaces/IStore.interface";
export declare class Store implements IStore {
    _component: IScope | null;
    private _keys;
    private _data;
    constructor(initialData: Record<string, any> & IScope);
    connect(scope: IScope): void;
}

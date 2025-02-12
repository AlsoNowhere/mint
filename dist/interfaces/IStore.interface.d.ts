import { IScope } from "./IScope.interface";
export interface IStore {
    _component: IScope | null;
    connect: (scope: IScope) => void;
}

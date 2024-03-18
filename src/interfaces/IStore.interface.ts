import { IScope } from "./IScope.interface";

export interface IStore {
  _component: IScope | null;
  _keys: Array<string>;
  _data: any;

  connect: (scope: IScope) => void;
}

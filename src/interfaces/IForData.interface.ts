import { IScope } from "./IScope.interface";

export interface IForData extends IScope {
  _x?: string | number;
  _parent: IScope;
  _i: number;
}

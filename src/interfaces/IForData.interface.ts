import { IScope } from "./IScope.interface";

export interface IForData extends IScope {
  _x: string | number | Object;
  _parent: IScope;
  _i: number;
  __name: "_ForData";
}

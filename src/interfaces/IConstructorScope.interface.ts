import { IScope } from "./IScope.interface";

export interface IConstructorScope extends IScope {
  new (): IScope;

  propTypes?: Record<string, string>;
}

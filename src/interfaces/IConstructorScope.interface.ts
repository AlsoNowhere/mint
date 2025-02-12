import { IScope } from "./IScope.interface";

import { TProps } from "../types/TProps.type";

export interface IConstructorScope extends IScope {
  new (): IScope;

  _propTypes?: Record<string, TProps>;
}

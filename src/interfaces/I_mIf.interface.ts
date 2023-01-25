import { MintElement } from "../models/MintElement.model";

import { IScope } from "./IScope.interface";

export interface I_mIf {
  inverse: boolean;
  ifValue: string;
  state: boolean;
  scope: IScope;
  templated: boolean;
  mintElement?: MintElement;
}

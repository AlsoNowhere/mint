import { Resolver } from "../../../store/Store";

import { MintElement } from "../../../models/MintElement.model";

import { IScope } from "../../../interfaces/IScope.interface";
import { I_mIf } from "../../../interfaces/I_mIf.interface";

export const generateMIf = (
  mintElement: MintElement,
  _ifValue: string,
  scope: IScope
): I_mIf => {
  const inverse = _ifValue.charAt(0) === "!";
  const ifValue = inverse ? _ifValue.substring(1) : _ifValue;
  const _state: boolean | Resolver = (scope as any)[ifValue];
  const result = _state instanceof Resolver ? _state.callback() : _state;
  const state = inverse ? !result : !!result;

  return {
    inverse,
    ifValue,
    state,
    scope,
    templated: state,
    mintElement,
  };
};

import { resolvePropertyLookup } from "../../services/resolve-property-lookup.logic";

import { UpwardRef } from "../../models/UpwardRef.model";

import { MINT_WARN } from "../../data/constants.data";

import { TonGenerate } from "../../types/MintAttributes/TonGenerate.type";

export const generateMRef: TonGenerate<{
  refValue: string;
}> = ({ refValue, htmlElement, parentScope, scope, isAttribute }) => {
  const value = resolvePropertyLookup(refValue, parentScope);

  // ** Here we check if the ref is UpwardRef.
  // ** This is a pattern where we don't manipulate the parentScope directly.
  // ** This means we can pass the property down to children.
  if (value instanceof UpwardRef) {
    value.ref = htmlElement;
  } else {
    const _scope = isAttribute ? scope : parentScope;
    _scope[refValue] = htmlElement;
    if (!!_scope._store) {
      if (_scope._store.hasOwnProperty(refValue)) {
        _scope._store[refValue] = htmlElement;
      }
      // <@ REMOVE FOR PRODUCTION
      else {
        console.warn(
          `${MINT_WARN} tried to add property "${refValue}" using mRef to store "${_scope._store.constructor.name}" which does not have this property.`
        );
      }
      // @>
    }
  }

  return {
    condition: false,
    value: undefined,
  };
};

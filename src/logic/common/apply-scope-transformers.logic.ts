import { resolverGetter } from "./resolve-getter.logic";

import { ScopeTransformer } from "../../models/scope-transformers/ScopeTransformer.model";

import { IMainScope } from "../../interfaces/IMainScope.interface";

// ** Some props on a Component are not what should be accessed when doing a lookup
// ** on that item.
// ** For example content that is derived at lookup time from something else.
// ** We replace those here with the other content.
export const applyScopeTransformers = (scope: IMainScope) => {
  const keys = Object.keys(scope);

  for (let key of keys) {
    // ** We need to check if this value has already been applied.
    // ** We can do this by checking if the value is writable and has a getter.
    const getter = resolverGetter(key, scope);

    // ** We don't want to lookup the item at this time and so we ignore these.
    if (getter === undefined && scope[key] instanceof ScopeTransformer) {
      scope[key].transform(scope, key);
    }
  }
};

import { IMainScope } from "../interfaces/IMainScope.interface";

import { MINT_WARN } from "../data/constants.data";

// ** This function allows the definition of property look ups on the scope.
// ** E.g 1
// ** { "[class]": "data.class"}
// ** scope = { data: { class: "padding" } }

// ** E.g 2
// ** const str = "Content: {data.content}"
// ** scope = { data: { content: "text value" } }

export const resolvePropertyLookup = (target: string, scope: IMainScope) => {
  if (target === "_children") {
    return scope._mintBlueprint.contentFor_children.length;
  }

  let _value = scope;
  const lookups = target.split(".");

  for (let x of lookups) {
    // <@ REMOVE FOR PRODUCTION
    if (!(_value instanceof Object)) {
      console.warn(
        `${MINT_WARN} while attempting to parse value "{${target}}" a non object was found -> ${_value}.`
      );
      return "";
    }
    // @>
    _value = _value[x];
  }

  return _value;
};

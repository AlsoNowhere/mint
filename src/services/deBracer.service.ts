import { resolvePropertyLookup } from "./resolve-property-lookup.logic";

import { MINT_ERROR } from "../data/constants.data";

import { _DevLogger_ } from "../_DEV_/_DevLogger_";

/*
  This function takes a string and an Object (scope). Every time the string
  contains braces with a variable inside we extract the value from the scope
  and replace it in the string.
  E.g:
  cosnt str = "Here is {content}";
  const scope = { content: "the truth" };

  str becomes "Here is the truth".
*/

//<@ REMOVE FOR PRODUCTION
const deBracerError = (
  text: string | number,
  scope: Object,
  errorMessage: string
) => {
  console.error(
    errorMessage,
    " -- deBracer ERROR. Text sent: ",
    text,
    "Scope: ",
    scope
  );
  throw new Error(`${MINT_ERROR} Text sent to resolve, not text: ${text}`);
};
//@>

const resolve = (_value: any, scope: Object, errorMessage: string) => {
  const value = _value instanceof Function ? _value.apply(scope) : _value;

  // ** Get a resolved string only value.
  const resolvedValue = (() => {
    if (value === undefined || value === null) return "";
    if (typeof value === "number") return value.toString();
    return value;
  })();

  // ** Here we allow the Dev to define a string output that might contain {variable} itself.
  // ** Cycle through until all are resolved.
  return deBracer(resolvedValue, scope, errorMessage);
};

export const deBracer = (
  text: string | number,
  scope: Object,
  errorMessage: string
): string => {
  /* Dev */
  // _DevLogger_("Debracer", errorMessage, text, scope);

  //<@ REMOVE FOR PRODUCTION
  if (typeof text !== "string" && typeof text !== "number")
    deBracerError(text, scope, errorMessage);
  //@>

  const textValue: string = typeof text === "string" ? text : text.toString();

  return textValue.replace(/\\*\{[.a-zA-Z0-9_$]+\}/g, (x) => {
    // ** If value is matched as "\{variable}" then return "{variable}".
    if (x.charAt(0) === "\\") return x.substring(1);

    // ** Get the variable, i.e "{variable}" -> "variable".
    const subStr = x.substring(1, x.length - 1);

    if (x.includes(".")) {
      const _value = resolvePropertyLookup(subStr, scope);
      return resolve(_value, scope, errorMessage);
    }

    // ** Get the value.
    const _value = (scope as any)[subStr];

    return resolve(_value, scope, errorMessage);
  });
};

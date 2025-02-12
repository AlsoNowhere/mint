import { IMainScope } from "../../interfaces/IMainScope.interface";

// ** This function returns the getter part of a property lookup, if it has one.
export const resolverGetter = (
  key: string,
  parentScope: IMainScope
): (() => any) | void => {
  const properties = Object.getOwnPropertyDescriptor(parentScope, key);

  let output: (() => any) | undefined = undefined;

  if (properties === undefined) return output;

  // ** We can reason here that there must be a getter if it's no writable
  // ** as Mint doesn't create one with the other.
  if (properties.writable === undefined) {
    output = properties.get;
  }

  return output;
};

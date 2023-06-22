import { IScope } from "../interfaces/IScope.interface";
import { IForData } from "../interfaces/IForData.interface";

export const isWritable = (value: string, parentScope: IForData | IScope) => {
  let properties: {
    writable?: true;
    get: () => any;
  } = Object.getOwnPropertyDescriptor(parentScope, value) as {
    writable?: true;
    get: () => any;
  };

  if (
    properties === undefined &&
    (parentScope as IForData)._parent !== undefined
  ) {
    properties = Object.getOwnPropertyDescriptor(
      (parentScope as IForData)._parent,
      value
    ) as {
      writable?: true;
      get: () => any;
    };
  }

  return properties !== undefined && properties.writable === undefined
    ? properties.get
    : undefined;
};

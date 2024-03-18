import { isWritable } from "../../services/is-writable.service";
import { deBracer } from "../../services/deBracer.service";

import { IScope } from "../../interfaces/IScope.interface";
import { IForData } from "../../interfaces/IForData.interface";

const handleResolverProperties = (
  scope: IScope,
  key: string,
  value: string,
  parentScope: IScope
) => {
  const writable = isWritable(value, parentScope);
  if (writable instanceof Function) {
    // ** If writable is undefined it means that this property is a getter, therefore created by the Resolver Object.
    // ** With that in mind we want to preserve this getter instead of just using the current value.
    Object.defineProperty(scope, key, {
      get: writable,
      configurable: true,
    });
  } else {
    (scope as any)[key] = (parentScope as any)[value];
  }
};

const bindingTemplateProp = (
  scope: IScope,
  key: string,
  value: string,
  parentScope: (IScope & IForData) | IScope,
  type: "template" | "refresh"
) => {
  if (key !== "scope") {
    handleResolverProperties(scope, key, value, parentScope);
    return;
  }

  if (type === "template") {
    if (value === "_store") {
      (scope as any)[key] = parentScope._store;
    } else if (value === "_scope") {
      const _parentScope: IForData = parentScope as IForData;

      if (_parentScope.__name === "_ForData") {
        (scope as any)[key] = _parentScope._parent;
      } else {
        (scope as any)[key] = parentScope;
      }
    }
  }
};

export const assignProps = (
  scope: IScope,
  props: Object,
  parentScope: IScope,
  type: "template" | "refresh"
) => {
  Object.entries(props).forEach(([key, value]) => {
    if (key.charAt(0) === "[" && key.charAt(key.length - 1) === "]") {
      const _key: string = key.substring(1, key.length - 1);
      bindingTemplateProp(scope, _key, value, parentScope, type);
    } else {
      (scope as any)[key] =
        typeof value === "string"
          ? deBracer(value, parentScope, "Template -- props")
          : value;
    }
  });
};

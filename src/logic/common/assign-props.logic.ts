import { deBracer } from "../../services/deBracer.service";

import { resolverGetter } from "./resolve-getter.logic";
import { resolvePropertyLookup } from "../../services/resolve-property-lookup.logic";
import { isAttrType } from "./is-attr-type.logic";

import { IProps } from "../../interfaces/IProps.interface";
import { IMainScope } from "../../interfaces/IMainScope.interface";

const handleResolverProperties = (scope: IMainScope, key: string, value: string, parentScope: IMainScope) => {
  const getter = resolverGetter(value, parentScope);
  if (getter instanceof Function) {
    // ** If getter is undefined it means that this property is a getter, therefore created by the Resolver Object.
    // ** With that in mind we want to preserve this getter instead of just using the current value.
    Object.defineProperty(scope, key, {
      get: getter,
      configurable: true,
    });
  } else {
    const newValue = resolvePropertyLookup(value, parentScope);

    // ** Here we check what the new value is going to be.
    // ** If its undefined or null it means we don't want to change the default or previously
    // ** defined value.
    if (newValue === undefined || newValue === null) return;

    scope[key] = newValue;
  }
};

const bindingTemplateProp = (scope: IMainScope, key: string, value: string, parentScope: IMainScope) => {
  if (key === "scope") return;
  handleResolverProperties(scope, key, value, parentScope);
};

// ** When a Component is defined, props are provided to it.
// ** Here we take those props and assign their values from the parent scope to this Component.
export const assignProps = (scope: IMainScope, orderedProps: Array<string>, props: IProps, parentScope: IMainScope) => {
  for (let key of orderedProps) {
    const value = props[key];

    if (isAttrType(key, "[", "]")) {
      const _key: string = key.substring(1, key.length - 1);
      bindingTemplateProp(scope, _key, value, parentScope);
    } else {
      const descriptors = Object.getOwnPropertyDescriptor(scope, key);

      // ** We do not want to try to assign to a property that only has a getter. Check for that here.
      if (descriptors !== undefined && descriptors.get !== undefined && descriptors.set === undefined) {
        return;
      }

      // ** If the prop is a string then extract the values (deBrace) from it before assigning.
      if (typeof value === "string") {
        scope[key] = deBracer(value, parentScope, "Template -- props");
      } else {
        scope[key] = value;
      }
    }
  }
};

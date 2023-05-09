import { IScope } from "../../../interfaces/IScope.interface";

const handleResolverProperties = (
  scope: IScope,
  key: string,
  value: string,
  parentScope: IScope
) => {
  const properties = Object.getOwnPropertyDescriptor(parentScope, value) as {
    writable?: true;
  };
  if (properties !== undefined && properties.writable === undefined) {
    // If writable is undefined it means that this property is a getter, therefore created by the Resolver Object.
    // With that in mind we want to preserve this getter instead of just using the current value.
    Object.defineProperty(scope, key, {
      get: () => (parentScope as any)[value],
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
  parentScope: IScope
) => {
  if (key !== "scope") {
    handleResolverProperties(scope, key, value, parentScope);
    return;
  }
  if (value === "_store") {
    (scope as any)[key] = parentScope._store;
  }
  if (value === "_scope") {
    (scope as any)[key] = parentScope;
  }
};

export const templateProps = (
  scope: IScope,
  props: Object,
  parentScope: IScope
) => {
  Object.entries(props).forEach(([key, value]) => {
    if (key.charAt(0) === "[" && key.charAt(key.length - 1) === "]") {
      const _key: string = key.substring(1, key.length - 1);
      bindingTemplateProp(scope, _key, value, parentScope);
    } else {
      (scope as any)[key] = value;
    }
  });
};

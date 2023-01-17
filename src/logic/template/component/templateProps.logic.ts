import { IScope } from "../../../interfaces/IScope.interface";

export const templateProps = (
  scope: IScope,
  props: Object,
  parentScope: IScope
) => {
  Object.entries(props).forEach(([key, value]) => {
    if (key.charAt(0) === "[" && key.charAt(key.length - 1) === "]") {
      const _key: string = key.substring(1, key.length - 1);
      if (_key === "scope" && value === "_store") {
        (scope as any)[_key] = parentScope._store;
      } else if (_key === "scope" && value === "_scope") {
        (scope as any)[_key] = parentScope;
      } else {
        (scope as any)[_key] = (parentScope as any)[value];
      }
    } else {
      (scope as any)[key] = value;
    }
  });
};

import { deBracer } from "../../../services/deBracer.service";

import { TElement } from "../../../types/TElement.type";

export const renderStringAttribute = (element: TElement, key: string, value: string, scope: Object) => {
  if (typeof value === "boolean") {
    (element as any)[key] = value;
  } else {
    const newAttributeValue = deBracer(value, scope, `Render - string attribute (${key}), (${value})`);
    element.setAttribute(key, newAttributeValue);
  }
};

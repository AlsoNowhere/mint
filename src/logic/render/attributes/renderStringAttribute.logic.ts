import { deBracer } from "../../../services/deBracer.service";

export const renderStringAttribute = (
  element: HTMLElement | SVGElement,
  key: string,
  value: string,
  scope: Object
) => {
  const newAttributeValue = deBracer(value, scope);

  if (typeof newAttributeValue === "boolean") {
    (element as any)[key] = newAttributeValue;
  } else {
    element.setAttribute(key, newAttributeValue);
  }
};

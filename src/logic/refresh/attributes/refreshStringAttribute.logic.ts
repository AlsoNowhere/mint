import { deBracer } from "../../../services/deBracer.service";

export const refreshStringAttribute = (
  element: HTMLElement | SVGElement,
  key: string,
  value: string,
  scope: Object
) => {
  const oldAttributeValue = element.getAttribute(key);
  const newAttributeValue = deBracer(value, scope);

  if (oldAttributeValue === newAttributeValue) {
    return;
  }

  if (typeof newAttributeValue === "boolean") {
    (element as any)[key] = newAttributeValue;
  } else if (newAttributeValue === undefined) {
    element.removeAttribute(key);
  } else {
    element.setAttribute(key, newAttributeValue);
  }
};

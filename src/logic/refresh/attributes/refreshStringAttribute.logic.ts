import { deBracer } from "../../../services/deBracer.service";

export const refreshStringAttribute = (
  element: HTMLElement | SVGElement,
  key: string,
  value: string,
  scope: Object
) => {
  const oldAttributeValue = element.getAttribute(key);

  if (oldAttributeValue === value) {
    return;
  }

  if (typeof value === "boolean") {
    (element as any)[key] = value;
  } else if (value === undefined) {
    element.removeAttribute(key);
  } else {
    const newAttributeValue = deBracer(value, scope);
    if (oldAttributeValue === newAttributeValue) {
      return;
    }
    element.setAttribute(key, newAttributeValue);
  }
};

import { deBracer } from "../../../services/deBracer.service";

import { attributesThatAreProperties } from "../../../data/attributesThatAreProperties.data";

export const refreshBindingAttributes = (
  element: HTMLElement | SVGElement,
  key: string,
  value: string,
  scope: Object
): void => {
  const target = key.substring(1, key.length - 1);
  const oldAttributeValue = element.getAttribute(target);
  const _value = (scope as any)[value];
  const newAttributeValue =
    _value instanceof Function ? _value.apply(scope) : _value;
  if (oldAttributeValue === newAttributeValue) {
    return;
  }
  if (typeof newAttributeValue === "boolean") {
    (element as any)[target] = newAttributeValue;
  } else if (newAttributeValue === undefined) {
    element.removeAttribute(target);
  } else if (attributesThatAreProperties.includes(target)) {
    const value =
      typeof newAttributeValue === "string"
        ? deBracer(newAttributeValue, scope, "Refresh - binding property")
        : newAttributeValue;

    // ===
    /*
        For this specific case (setting value on <select> elements).
        The value property does not apply if the option for that value does not exist as a child of the select.
        Therefore the value has to be set after adding the options, which we can do here by waiting until the stack has finished).
      */
    if (target === "value" && element instanceof HTMLSelectElement) {
      setTimeout(() => {
        (element as any)[target] = value;
      }, 0);
    }
    // ===
    else if (value !== undefined) {
      (element as any)[target] = value;
    }
  } else {
    element.setAttribute(
      target,
      deBracer(newAttributeValue, scope, "Refresh - binding attribute")
    );
  }
};

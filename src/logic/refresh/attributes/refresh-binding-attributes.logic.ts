import { deBracer } from "../../../services/deBracer.service";

import { resolvePropertyLookup } from "../../../services/resolve-property-lookup.logic";

import { attributesThatAreBoolean, attributesThatAreProperties } from "../../../data/constants.data";

import { TElement } from "../../../types/TElement.type";

const getOldValue = (target: string, element: TElement) => {
  if (attributesThatAreProperties.includes(target)) {
    return element[target];
  }
  return element.getAttribute(target);
};

export const refreshBindingAttributes = (element: TElement, key: string, property: string, scope: Object): void => {
  const target = key.substring(1, key.length - 1);
  const oldAttributeValue = getOldValue(target, element);
  const _value = resolvePropertyLookup(property, scope);
  const newAttributeValue = _value instanceof Function ? _value.apply(scope) : _value;

  if (oldAttributeValue === newAttributeValue) {
    return;
  }

  if (typeof newAttributeValue === "boolean") {
    (element as any)[target] = newAttributeValue;
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
    // ===
    /*
      For the case where the property needs to be set as a boolean but is not a boolean value
      do that here.
      For example setting checked on Input type checkbox.1
    */
    else if (attributesThatAreBoolean.includes(target)) {
      (element as any)[target] = !!value;
    }
    // ===
    else if (value !== undefined) {
      (element as any)[target] = value;
    }
  } else if (newAttributeValue === undefined || newAttributeValue === null) {
    element.removeAttribute(target);
  } else {
    element.setAttribute(target, deBracer(newAttributeValue, scope, "Refresh - binding attribute"));
  }
};

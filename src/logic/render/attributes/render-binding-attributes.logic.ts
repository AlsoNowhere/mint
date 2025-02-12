import { deBracer } from "../../../services/deBracer.service";

import { resolverGetter } from "../../common/resolve-getter.logic";

import { IMainScope } from "../../../interfaces/IMainScope.interface";

import { attributesThatAreProperties } from "../../../data/constants.data";

import { TElement } from "../../../types/TElement.type";

import { _DevLogger_ } from "../../../_DEV_/_DevLogger_";

const getValue = (property: string, scope: IMainScope) => {
  const getter = resolverGetter(property, scope);
  let _value =
    getter instanceof Function ? getter.apply(scope) : scope[property];
  if (typeof _value === "number") {
    _value = _value.toString();
  }
  return _value;
};

export const renderBindingAttributes = (
  element: TElement,
  key: string,
  property: string,
  scope: IMainScope
): void => {
  const target = key.substring(1, key.length - 1);
  const _value = getValue(property, scope);
  const newAttributeValue =
    _value instanceof Function ? _value.apply(scope) : _value;

  /* Dev */
  // _DevLogger_("RENDER", "ATTRIBUTES", target, newAttributeValue);

  if (typeof newAttributeValue === "boolean") {
    (element as any)[target] = newAttributeValue;
  } else if (attributesThatAreProperties.includes(target)) {
    const value =
      typeof newAttributeValue === "string"
        ? deBracer(newAttributeValue, scope, "Render - binding property")
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
  } else if (
    newAttributeValue !== undefined &&
    newAttributeValue !== false &&
    newAttributeValue !== null
  ) {
    element.setAttribute(
      target,
      deBracer(
        newAttributeValue,
        scope,
        `Render - binding attribute - (${target}), (${newAttributeValue})`
      )
    );
  }
};

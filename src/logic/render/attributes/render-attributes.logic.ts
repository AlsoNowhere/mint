import { renderEventAttributes } from "./render-event-attributes.logic";
import { renderBindingAttributes } from "./render-binding-attributes.logic";
import { renderStringAttribute } from "./render-string-attribute.logic";
import { isAttrType } from "../../common/is-attr-type.logic";

import { Blueprint } from "../../../models/blueprint/Blueprint.model";

import { IAttributes } from "../../../interfaces/IAttributes.interface";

import { attributesToIgnore } from "../../../data/mint-attributes.data";
import { MINT_ERROR } from "../../../data/constants.data";

import { TElement } from "../../../types/TElement.type";

import { _DevLogger_ } from "../../../_DEV_/_DevLogger_";

const setAttribute = (
  element: TElement,
  key: string,
  value: string,
  orderedAttributes: Array<string>,
  attributes: IAttributes,
  scope: Object,
) => {
  /* Dev */
  // _DevLogger_("RENDER", "SETATTRIBUTE", key, "|", value, [element]);

  // ** Events are attributes defined like: "(attr)".
  const isEvent = isAttrType(key, "(", ")");
  if (isEvent) {
    renderEventAttributes(element, key, value, orderedAttributes, attributes, scope);
  }

  // ** Value binding attributes are defined like "[attr]".
  const isValueBinding = isAttrType(key, "[", "]");
  if (isValueBinding) {
    renderBindingAttributes(element, key, value, scope);
  }

  {
    const isNormal = !isEvent && !isValueBinding;
    if (isNormal) {
      renderStringAttribute(element, key, value, scope);
    }
  }
};

export const renderAttributes = (
  // element: TElement,
  // orderedAttributes: null | Array<string>,
  // attributes: IAttributes,
  // scope: Object
  blueprint: Blueprint,
) => {
  const { orderedAttributes, attributes, scope } = blueprint;

  const element = blueprint.element as TElement;

  /* DEV */
  // _DevLogger_("RENDER", "ATTRIBUTES", orderedAttributes, blueprint);

  if (attributes === undefined || orderedAttributes === null) return;

  // <@ REMOVE FOR PRODUCTION
  if (orderedAttributes === undefined)
    throw new Error(`${MINT_ERROR} Attributes cannot be undefined, only null or object`);
  // @>

  // ** Loop over the attributes and add them in turn.
  // ** "set" here refers to all the different types of attributes.
  // ** We clone the attributes here so that the loop will retain the full list of attributes
  // ** even if some are removed during the processing.
  for (let key of [...orderedAttributes]) {
    const value = attributes[key];

    // ** If the attribute here is a mint attribute then ignore that attribute.
    if (attributesToIgnore.includes(key)) continue;

    // ** If the value is undefined, that is acceptable but no attribute will be added.
    if (value === undefined) continue;

    setAttribute(element, key, value, orderedAttributes, attributes, scope);
  }
};

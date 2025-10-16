import { refreshBindingAttributes } from "./refresh-binding-attributes.logic";
import { refreshStringAttribute } from "./refresh-string-attribute.logic";
import { isAttrType } from "../../common/is-attr-type.logic";

import { IAttributes } from "../../../interfaces/IAttributes.interface";
import { IMainScope } from "../../../interfaces/IMainScope.interface";

import { attributesToIgnore } from "../../../data/mint-attributes.data";

import { TElement } from "../../../types/TElement.type";

import { _DevLogger_ } from "../../../_DEV_/_DevLogger_";

const setAttribute = (element: TElement, key: string, value: string, scope: Object) => {
  /* Dev */
  // _DevLogger_("REFRESH", "SETATTRIBUTE: ", key, "|", value);

  if (isAttrType(key, "(", ")")) {
    console.error("Event handler attribute was present in refresh");
    console.trace();
  }
  if (isAttrType(key, "[", "]")) {
    refreshBindingAttributes(element, key, value, scope);
  } else {
    refreshStringAttribute(element, key, value, scope);
  }
};

export const refreshAttributes = (
  element: TElement,
  orderedAttributes: Array<string>,
  attributes: IAttributes,
  scope: IMainScope,
) => {
  /* DEV */
  // _DevLogger_("REFRESH", "ATTRIBUTES: ", orderedAttributes, { element });

  for (let key of orderedAttributes) {
    const value = attributes[key];
    if (attributesToIgnore.includes(key)) continue;
    setAttribute(element, key, value, scope);
  }
};

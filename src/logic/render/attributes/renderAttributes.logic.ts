import { renderEventAttributes } from "./renderEventAttributes.logic";
import { renderBindingAttributes } from "./renderBindingAttributes.logic";
import { renderStringAttribute } from "./renderStringAttribute.logic";

const setAttribute = (
  element: HTMLElement | SVGElement,
  key: string,
  value: string,
  attributes: Object,
  scope: Object
) => {
  /* Dev */
  // console.log("DEV === RENDER === SETATTRIBUTE: ", key, "|", value);

  if (key.charAt(0) === "(" && key.slice(-1) === ")") {
    renderEventAttributes(element, key, value, attributes, scope);
  } else if (key.charAt(0) === "[" && key.slice(-1) === "]") {
    renderBindingAttributes(element, key, value, scope);
  } else {
    renderStringAttribute(element, key, value, scope);
  }
};

export const renderAttributes = (
  element: HTMLElement | SVGElement,
  attributes: Object,
  scope: Object
) => {
  /* DEV */
  // console.log("DEV === RENDER === ATTRIBUTES: ", attributes, { element });

  if ((attributes as any)["m-extend"] instanceof Object) {
    Object.entries((attributes as any)["m-extend"]).forEach(([key, value]) => {
      (attributes as any)[key] = value;
    });
    delete (attributes as any)["m-extend"];
  }

  Object.entries(attributes).forEach(([key, value]) => {
    if (key === "mintElement_index") return;
    setAttribute(element, key, value, attributes, scope);
  });
};

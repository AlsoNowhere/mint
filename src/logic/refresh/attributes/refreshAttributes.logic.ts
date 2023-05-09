import { refreshBindingAttributes } from "./refreshBindingAttributes.logic";
import { refreshStringAttribute } from "./refreshStringAttribute.logic";

const setAttribute = (
  element: HTMLElement | SVGElement,
  key: string,
  value: string,
  scope: Object
) => {
  /* Dev */
  // console.log("DEV === REFRESH === SETATTRIBUTE: ", key, "|", value);

  if (key.charAt(0) === "[" && key.slice(-1) === "]") {
    refreshBindingAttributes(element, key, value, scope);
  } else {
    refreshStringAttribute(element, key, value, scope);
  }
};

export const refreshAttributes = (
  element: HTMLElement | SVGElement,
  attributes: Object,
  scope: Object
) => {
  /* DEV */
  // console.log("DEV === REFRESH === ATTRIBUTES: ", attributes, { element });

  Object.entries(attributes).forEach(([key, value]) => {
    if (key === "mintElement_index") return;
    setAttribute(element, key, value, scope);
  });
};

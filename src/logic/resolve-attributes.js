
import { resolveBraces } from "./resolve-braces";

const setAttribute = (
    element,
    componentScope,
    key,
    value,
    attributes
) => {
    if (key.charAt(0) === "(" && key.slice(-1) === ")") {
        const target = key.substring(1, key.length - 1);
        element.addEventListener(target, event => componentScope[value].apply(componentScope, [element, componentScope, event]));
        delete attributes[key];
    }
    else if (key.charAt(0) === "[" && key.slice(-1) === "]") {
        const target = key.substring(1, key.length - 1);
        const oldAttributeValue = element.getAttribute(target);
        const newAttributeValue = componentScope[value];

        if (oldAttributeValue === newAttributeValue) {
            return;
        }
        if (typeof newAttributeValue === "boolean") {
            element[target] = newAttributeValue;
        }
        else if (newAttributeValue === undefined) {
            element.removeAttribute(target);
        }
        else {
            element.setAttribute(target, resolveBraces(newAttributeValue, componentScope));
        }
    }
    else {
        const oldAttributeValue = element.getAttribute(key);
        const newAttributeValue = resolveBraces(value, componentScope);

        if (oldAttributeValue === newAttributeValue) {
            return;
        }
        if (typeof newAttributeValue === "boolean") {
            element[key] = newAttributeValue;
        }
        else if (newAttributeValue === undefined) {
            element.removeAttribute(key);
        }
        else {
            element.setAttribute(key, newAttributeValue);
        }
    }
}

export const resolveAttributes = (
    element,
    componentScope,
    attributes
) => {
    Object.entries(attributes).forEach(([key, value]) => {
        setAttribute(element, componentScope, key, value, attributes);
    });
}

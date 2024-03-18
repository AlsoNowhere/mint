import { TElement } from "../types/TElement.type";

export const replaceElements = (element: TElement, beforeElement: TElement) => {
  const rootElement = element.parentElement as TElement;
  rootElement.removeChild(element);
  if (beforeElement === undefined) rootElement.append(element);
  rootElement.insertBefore(element, beforeElement);
};

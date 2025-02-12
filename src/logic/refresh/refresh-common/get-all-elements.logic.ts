import { Blueprint } from "../../../models/blueprint/Blueprint.model";

import { TElement } from "../../../types/TElement.type";

export const getAllElements = (blueprints: Array<Blueprint>) => {
  const allElements: Array<Text | TElement> = [];

  for (let x of blueprints) {
    if (x.element instanceof Element) {
      allElements.push(x.element);
      continue;
    }

    if (x.collection instanceof Array) {
      allElements.push(...getAllElements(x.collection));
      continue;
    }
  }

  return allElements;
};

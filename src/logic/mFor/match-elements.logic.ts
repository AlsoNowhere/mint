import { MINT_ERROR } from "../../data/constants.data";
import { ComponentBlueprint } from "../../models/blueprint/ComponentBlueprint.model";
import { ElementBlueprint } from "../../models/blueprint/ElementBlueprint.model";

import { TElement } from "../../types/TElement.type";

const moveElement = (element: TElement, index: number) => {
  const parentElement = element.parentElement as TElement;
  const before = Array.from(parentElement.children)[index];
  if (before === undefined) {
    parentElement.append(element);
  } else {
    parentElement.insertBefore(element, before);
  }
};

export const matchElements = (
  currentRenders: Array<ElementBlueprint | ComponentBlueprint>,
  oldList: Array<any>,
  newList: Array<any>,
  forKey: string
) => {
  let stopped = false;
  for (let [i, x] of currentRenders.entries()) {
    if (stopped) return;
    if (x.element === undefined) return;

    let index: number = -1;
    for (let [i, y] of newList.entries()) {
      if (x.scope[forKey] === y[forKey]) {
        index = i;
      }
    }

    if (index === undefined) return;
    if (i === index) return;
    if (index === -1) {
      console.warn(MINT_ERROR + "Unexpected mFor refresh error");
      return;
    }
    const [hold] = currentRenders.splice(i, 1);
    currentRenders.splice(index, 0, hold);
    stopped = true;
    const element = x.element;
    moveElement(element, index + 1);
    matchElements(currentRenders, oldList, newList, forKey);
  }
};

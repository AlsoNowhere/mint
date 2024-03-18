import { Template } from "../../../models/Template.model";

import { MINT_ERROR } from "../../../data/constants.data";

const moveElement = (element: any, index: number) => {
  const parentElement = element.parentElement;
  const before = Array.from(parentElement.children)[index];
  if (before === undefined) {
    parentElement.append(element);
  } else {
    parentElement.insertBefore(element, before);
  }
};

export const matchElements = (
  currentRenders: Array<Template>,
  oldList: Array<any>,
  newList: Array<any>,
  forKey: string
) => {
  let stopped = false;
  currentRenders.forEach((x, i) => {
    if (stopped) return;
    const index = newList.findIndex(
      (y) => (x.scope as any)[forKey] === y[forKey]
    );
    if (i === index) return;
    if (index === -1) {
      console.warn(MINT_ERROR + "Unexpected mFor refresh error");
      return;
    }
    const [hold] = currentRenders.splice(i, 1);
    currentRenders.splice(index, 0, hold);
    stopped = true;
    moveElement(x.element, index + 1);
    matchElements(currentRenders, oldList, newList, forKey);
  });
};

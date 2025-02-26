import { Blueprint } from "../../models/blueprint/Blueprint.model";
import { ForBlueprint } from "../../models/blueprint/ForBlueprint.model";

import { TElement } from "../../types/TElement.type";

import { _DevLogger_ } from "../../_DEV_/_DevLogger_";

const getWhereToInsert = (
  parentElement: Element,
  childBlueprints: Array<Blueprint>,
  blueprintIndex: number
): Text | TElement | undefined => {
  for (let [i, blueprint] of childBlueprints.entries()) {
    if (i < blueprintIndex + 1) continue;
    const collection =
      blueprint.collection || (blueprint as ForBlueprint).forListBlueprints;
    if (collection instanceof Array) {
      for (let contentBlueprint of collection) {
        const element = contentBlueprint.element;
        if (parentElement.contains(element ?? null)) {
          return element;
        }
      }
    }
    if (blueprint.element === undefined) {
      continue;
    }
    const element = blueprint.element;
    if (parentElement.contains(element)) {
      return element;
    }
  }
};

// ** This function takes a HTMLElement and add its into the parent HTMLElement.
export const addElement = (
  element: TElement | Text,
  parentElement: TElement,
  blueprintsList: Array<Blueprint>,
  blueprintIndex: number
) => {
  /* DEV */
  // _DevLogger_("ADD", "ELEMENT", element, blueprintsList);

  const elementToInsertBefore = getWhereToInsert(
    parentElement,
    blueprintsList,
    blueprintIndex
  );

  if (elementToInsertBefore !== undefined) {
    parentElement.insertBefore(element, elementToInsertBefore);
  } else {
    parentElement.appendChild(element);
  }
};

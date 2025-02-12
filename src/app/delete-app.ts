import { IApp } from "../interfaces/IApp.interface";
import { Blueprint } from "../models/blueprint/Blueprint.model";

import { TElement } from "../types/TElement.type";

const extractElements = (
  blueprints: Array<Blueprint>,
  blueprintElements: Array<TElement | Text | undefined> = []
) => {
  const _blueprints: Array<any> = [];
  for (let blueprint of blueprints) {
    _blueprints.push({
      ...blueprint,
    });
  }

  for (let blueprint of _blueprints) {
    if (blueprint.element) {
      blueprintElements.push(blueprint.element);
    }
    if (blueprint.collection) {
      extractElements(blueprint.collection, blueprintElements);
    }
  }

  return blueprintElements;
};

export const deleteApp = (app: IApp) => {
  const { rootElement, scope } = app;

  // ** We get all the Nodes that could be on the Document only from this given app.
  const blueprintElements = extractElements(scope);

  // ** We get all the elements that are currently on the rootElement. If this is the document.body then this will include SCRIPT.
  const rootElementNodes = Array.from(
    rootElement.childNodes
  ) as Array<HTMLElement>;

  for (let x of rootElementNodes) {
    if (blueprintElements.includes(x)) {
      // ** If this Node from this app is a child of the rootElement then we remove it.
      rootElement.removeChild(x);
    }
  }
};

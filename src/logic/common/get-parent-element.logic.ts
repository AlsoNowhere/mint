import { Blueprint } from "../../models/blueprint/Blueprint.model";

import { TElement } from "../../types/TElement.type";

// ** It's not super easy to reason how to get the parentBlueprint of
// ** of a Blueprint and so we put that logic here.
export const getParentElement = (blueprint: Blueprint): TElement => {
  const { parentBlueprint } = blueprint;

  const { _rootElement } = blueprint._rootScope;

  if (parentBlueprint === null) return _rootElement;

  const { element } = parentBlueprint;
  if (element !== undefined) return element as TElement;

  return getParentElement(parentBlueprint);
};

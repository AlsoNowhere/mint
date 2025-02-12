import { Blueprint } from "../../models/blueprint/Blueprint.model";
import { MintAttribute } from "../../models/mint-attributes/MintAttribute.model";

import { TonRefresh } from "../../types/MintAttributes/TonRefresh.type";
import { TElement } from "../../types/TElement.type";
import { TShouldExit } from "../../types/TShouldExit.type";

export const resolveMAttributesOnRefresh: TonRefresh = (
  blueprint: Blueprint,
  parentElement: TElement,
  blueprintList: Array<Blueprint>,
  blueprintIndex: number,
  options: { newlyInserted: boolean }
) => {
  const {
    orderedProps = [],
    props = {},
    orderedAttributes = [],
    attributes = {},
  } = blueprint;

  let shouldExit: TShouldExit = { condition: false, value: undefined };

  for (let key of orderedProps) {
    const property = props[key];
    const resolver: TonRefresh = property.onRefresh;

    if (
      shouldExit.condition === false &&
      property instanceof MintAttribute &&
      resolver instanceof Function
    ) {
      shouldExit = resolver.apply(property, [
        blueprint,
        parentElement,
        blueprintList,
        blueprintIndex,
        options,
      ]);
    }
  }

  for (let key of orderedAttributes) {
    const property = attributes[key];
    const resolver: TonRefresh = property.onRefresh;

    if (
      shouldExit.condition === false &&
      property instanceof MintAttribute &&
      resolver instanceof Function
    ) {
      shouldExit = resolver.apply(property, [
        blueprint,
        parentElement,
        blueprintList,
        blueprintIndex,
        options,
      ]);
    }
  }

  return shouldExit;
};

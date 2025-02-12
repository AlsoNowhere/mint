import { MintAttribute } from "../../models/mint-attributes/MintAttribute.model";
import { Blueprint } from "../../models/blueprint/Blueprint.model";

import { TonRender } from "../../types/MintAttributes/TonRender.type";
import { TShouldExit } from "../../types/TShouldExit.type";
import { TElement } from "../../types/TElement.type";

export const resolveMAttributesOnRender = (
  blueprint: Blueprint,
  parentElement: TElement,
  parentChildBlueprints: Array<Blueprint>,
  blueprintIndex: number
) => {
  const { orderedProps = [], props = {} } = blueprint;

  let shouldExit: TShouldExit = { condition: false, value: undefined };

  for (let key of orderedProps) {
    const property = props[key];
    const resolver: TonRender = property.onRender;

    if (
      shouldExit.condition === false &&
      property instanceof MintAttribute &&
      resolver instanceof Function
    ) {
      shouldExit = resolver.apply(property, [
        blueprint,
        parentElement,
        parentChildBlueprints,
        blueprintIndex,
      ]);
    }
  }

  return shouldExit;
};

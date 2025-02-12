import { renderBlueprints } from "../render/render-blueprints.logic";

import { Blueprint } from "../../models/blueprint/Blueprint.model";

import { MINT_ERROR } from "../../data/constants.data";

import { TElement } from "../../types/TElement.type";
import { TShouldExit } from "../../types/TShouldExit.type";

export const renderFor = (
  blueprint: Blueprint,
  childBlueprints: Array<Blueprint>,
  parentElement: TElement,
  blueprintIndex: number
) => {
  // <@ REMOVE FOR PRODUCTION
  if (
    blueprint === null ||
    blueprint.collection === null ||
    blueprint.collection === undefined
  ) {
    throw new Error(
      `${MINT_ERROR} Render - For - Wrong Blueprint sent to mFor.`
    );
  }
  // @>

  const { collection } = blueprint;

  for (let x of collection) {
    renderBlueprints([x], parentElement, childBlueprints, [blueprintIndex]);
  }

  return {
    condition: true,
    value: blueprint,
  } as TShouldExit;
};

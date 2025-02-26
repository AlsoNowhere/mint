import { renderBlueprints } from "../render/render-blueprints.logic";

import { Blueprint } from "../../models/blueprint/Blueprint.model";
import { ForBlueprint } from "../../models/blueprint/ForBlueprint.model";

import { MINT_ERROR } from "../../data/constants.data";

import { TElement } from "../../types/TElement.type";
import { TShouldExit } from "../../types/TShouldExit.type";

export const renderFor = (
  blueprint: ForBlueprint,
  childBlueprints: Array<Blueprint>,
  parentElement: TElement,
  blueprintIndex: number
) => {
  // <@ REMOVE FOR PRODUCTION
  if (
    blueprint === null ||
    blueprint.forListBlueprints === null ||
    blueprint.forListBlueprints === undefined
  ) {
    throw new Error(
      `${MINT_ERROR} Render - For - Wrong Blueprint sent to mFor.`
    );
  }
  // @>

  const { forListBlueprints } = blueprint;

  for (let x of forListBlueprints) {
    renderBlueprints([x], parentElement, childBlueprints, [blueprintIndex]);
  }

  return {
    condition: true,
    value: blueprint,
  } as TShouldExit;
};

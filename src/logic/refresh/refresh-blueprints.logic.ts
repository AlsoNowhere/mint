import { getBlueprintIndex } from "../common/get-blueprint-index.logic";
import { getParentElement } from "../common/get-parent-element.logic";

import { Blueprint } from "../../models/blueprint/Blueprint.model";

import { TRefresh } from "../../types/TRefresh.type";
import { TonRefresh } from "../../types/MintAttributes/TonRefresh.type";

import { _DevLogger_ } from "../../_DEV_/_DevLogger_";

const refreshBlueprint: TRefresh = (
  blueprint: Blueprint,
  options: { newlyInserted: boolean }
) => {
  const parentElement = getParentElement(blueprint);
  const { blueprintList, blueprintIndex } = getBlueprintIndex(blueprint);

  /* Dev */
  // _DevLogger_("REFRESH", "Blueprint", blueprint);

  const focusTarget = document.activeElement;

  const _refresh = blueprint.mintNode.refresh as TonRefresh;

  _refresh(blueprint, parentElement, blueprintList, blueprintIndex, {
    newlyInserted: options.newlyInserted,
  });

  // ** Here we check if the Element that was refreshed was the activeElement (had focus).
  // ** If it was then we re add the focus if it has been lost.
  if (
    focusTarget !== null &&
    focusTarget !== document.activeElement &&
    document.body.contains(focusTarget)
  ) {
    (focusTarget as HTMLElement).focus();
  }
};

export const refreshBlueprints = (blueprints: Array<Blueprint>) => {
  for (let blueprint of blueprints) {
    refreshBlueprint(blueprint, { newlyInserted: false });
  }
};

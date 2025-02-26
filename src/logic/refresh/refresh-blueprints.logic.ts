import { getParentElement } from "../common/get-parent-element.logic";

import { Blueprint } from "../../models/blueprint/Blueprint.model";

import { TRefresh } from "../../types/TRefresh.type";
import { TonRefresh } from "../../types/MintAttributes/TonRefresh.type";

import { _DevLogger_ } from "../../_DEV_/_DevLogger_";

const refreshBlueprint: TRefresh = (blueprint, options) => {
  const parentElement = getParentElement(blueprint);

  /* Dev */
  // _DevLogger_("REFRESH", "Blueprint", blueprint);

  const focusTarget = document.activeElement;

  if (blueprint.mintNode === null) {
    if (blueprint.refresh) {
      blueprint.refresh(blueprint, { newlyInserted: options.newlyInserted });
    }
    return;
  }

  const _refresh = blueprint.mintNode.refresh as TonRefresh;

  _refresh(blueprint, parentElement, options);

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

export const refreshBlueprints = (
  blueprints: Array<Blueprint>,
  options: { newlyInserted: boolean }
) => {
  for (let blueprint of blueprints) {
    refreshBlueprint(blueprint, options);
  }
};

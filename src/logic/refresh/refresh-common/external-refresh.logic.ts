import { Store } from "../../../store/Store";

import { refreshBlueprints } from "../refresh-blueprints.logic";
import { currentlyTracking } from "../../common/currently-tracking.logic";

import { Blueprint } from "../../../models/blueprint/Blueprint.model";

import { IScope } from "../../../interfaces/IScope.interface";

import { MINT_ERROR, MINT_WARN } from "../../../data/constants.data";
import { _DevLogger_ } from "../../../_DEV_/_DevLogger_";

const externalRefreshBlueprint = (
  scopeOrBlueprint: IScope | Blueprint | Store
) => {
  const blueprint =
    scopeOrBlueprint instanceof Blueprint
      ? scopeOrBlueprint
      : scopeOrBlueprint instanceof Store
      ? scopeOrBlueprint._component?._mintBlueprint
      : scopeOrBlueprint._mintBlueprint;

  // <@ REMOVE FOR PRODUCTION
  if (blueprint === undefined) {
    throw new Error(
      `${MINT_ERROR} refresh called using an invalid scope. Blueprint is undefined.`
    );
  }
  // @>

  if (currentlyTracking.updating(blueprint)) {
    console.warn(
      `${MINT_WARN} refresh() detected while still templating, refresh ignored.`
    );
    return;
  }
  currentlyTracking.addBlueprint(blueprint);

  refreshBlueprints([blueprint], { newlyInserted: false });

  currentlyTracking.removeBlueprint(blueprint);
};

export const externalRefresh = (
  target: IScope | Blueprint | Array<Blueprint> | Store
) => {
  let arr: Array<IScope | Blueprint | Store> = [];

  /* Dev */
  // _DevLogger_("REFRESH: ", "target", target);

  if (!(target instanceof Array)) {
    arr = [target];
  } else {
    arr = target;
  }

  for (let each of arr) {
    externalRefreshBlueprint(each);
  }
};

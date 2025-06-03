import { Store } from "../../../store/Store";

import { refreshBlueprints } from "../refresh-blueprints.logic";
import { currentlyTracking } from "../../common/currently-tracking.logic";

import { Blueprint } from "../../../models/blueprint/Blueprint.model";

import { IScope } from "../../../interfaces/IScope.interface";

import { MINT_ERROR, MINT_WARN } from "../../../data/constants.data";

import { _DevLogger_ } from "../../../_DEV_/_DevLogger_";

const externalRefreshBlueprint = (scopeOrBlueprintOrStore: Blueprint | IScope | Store) => {
  let blueprint: undefined | Blueprint = undefined;

  const { _mintBlueprint } = scopeOrBlueprintOrStore as IScope;
  const { _component } = scopeOrBlueprintOrStore as Store;

  // ** Passed a Blueprint directly
  if (scopeOrBlueprintOrStore instanceof Blueprint) {
    blueprint = scopeOrBlueprintOrStore;
  }
  // ** Passed IScope
  else if (!!_mintBlueprint) {
    blueprint = _mintBlueprint;
  }
  // ** Passed Store
  else if (_component !== undefined) {
    // ** If this Store is not currently connected to a Component then do nothing.
    if (_component === null) {
      return;
    }
    blueprint = _component._mintBlueprint;
  }

  // <@ REMOVE FOR PRODUCTION
  if (blueprint === undefined) {
    throw new Error(`${MINT_ERROR} refresh called using an invalid scope. Blueprint is undefined.`);
  }
  // @>

  if (currentlyTracking.updating(blueprint)) {
    console.warn(`${MINT_WARN} refresh() detected while still templating, refresh ignored.`);
    return;
  }
  currentlyTracking.addBlueprint(blueprint);

  refreshBlueprints([blueprint], { newlyInserted: false });

  currentlyTracking.removeBlueprint(blueprint);
};

export const externalRefresh = (target: IScope | Blueprint | Array<Blueprint> | Store) => {
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

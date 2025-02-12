import { Blueprint } from "../../models/blueprint/Blueprint.model";
import { ComponentBlueprint } from "../../models/blueprint/ComponentBlueprint.model";
import { ElementBlueprint } from "../../models/blueprint/ElementBlueprint.model";

import { _DevLogger_ } from "../../_DEV_/_DevLogger_";

const fillOutElements = (
  blueprintList: Array<Blueprint>,
  initialBlueprint: Blueprint
) => {
  const output: Array<Blueprint> = [];

  const a = output;

  for (let x of blueprintList as Array<ComponentBlueprint | ElementBlueprint>) {
    const b = x;

    if (b !== initialBlueprint && b.fragment) {
      if (!!b.childBlueprints) {
        a.push(...fillOutElements(b.childBlueprints, initialBlueprint));
      }
      if (!!b.collection) {
        a.push(...fillOutElements(b.collection, initialBlueprint));
      }
    } else {
      a.push(b);
    }
  }

  return output;
};

// ** Here we take a Blueprint and find the index among the parent content so that
// ** we can insert the Blueprint content correctly amongst it.
export const getBlueprintIndex = (
  blueprint: Blueprint,
  initialBlueprint = blueprint
): {
  blueprintList: Array<Blueprint>;
  blueprintIndex: number;
} => {
  const { parentBlueprint } = blueprint;

  const { _rootChildBlueprints } = blueprint._rootScope;

  let blueprintList, blueprintIndex;

  if (parentBlueprint === null) {
    blueprintList = fillOutElements(_rootChildBlueprints, initialBlueprint);
    blueprintIndex = _rootChildBlueprints.indexOf(blueprint);
    return { blueprintList, blueprintIndex };
  }

  const { fragment, collection, childBlueprints } = parentBlueprint;

  if (fragment) {
    return getBlueprintIndex(parentBlueprint, initialBlueprint);
  }

  if (childBlueprints !== undefined) {
    blueprintList = childBlueprints;
  }

  if (collection !== undefined) {
    blueprintList = collection;
  }

  blueprintList = fillOutElements(
    blueprintList as Array<ComponentBlueprint | ElementBlueprint>,
    initialBlueprint
  );
  blueprintIndex = blueprintList.indexOf(initialBlueprint);

  /* DEV */
  // _DevLogger_("REFRESH", "INDEX", blueprint, blueprintIndex);

  return { blueprintList, blueprintIndex };
};

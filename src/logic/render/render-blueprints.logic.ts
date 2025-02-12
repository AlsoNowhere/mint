import { resolveMAttributesOnRender } from "../resolve-m-attributes/on-render.logic";

import { Blueprint } from "../../models/blueprint/Blueprint.model";

import { TElement } from "../../types/TElement.type";
import { TRender } from "../../types/TRender.type";

import { _DevLogger_ } from "../../_DEV_/_DevLogger_";

const renderBlueprint: TRender = (
  blueprint,
  parentElement,
  parentChildBlueprints,
  blueprintIndex
): void => {
  /* DEV */
  // _DevLogger_("RENDER", "Blueprint", blueprint);

  {
    const shouldReturn = resolveMAttributesOnRender(
      blueprint,
      parentElement,
      parentChildBlueprints,
      blueprintIndex
    );

    if (shouldReturn.condition) {
      return;
    }
  }

  blueprint.mintNode.render(
    blueprint,
    parentElement,
    parentChildBlueprints,
    blueprintIndex
  );
};

export const renderBlueprints = (
  blueprints: Array<Blueprint>,
  parentElement: TElement,
  parentChildBlueprints: Array<Blueprint> = blueprints,
  indexes?: Array<number>
) => {
  for (let [index, blueprint] of blueprints.entries()) {
    renderBlueprint(
      blueprint,
      parentElement,
      parentChildBlueprints,
      !!indexes ? indexes[index] : index
    );
  }
};

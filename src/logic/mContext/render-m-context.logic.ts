import { generateBlueprints } from "../generate/generate-blueprints.logic";
import { renderBlueprints } from "../render/render-blueprints.logic";

import { ContextBlueprint } from "../../models/blueprint/ContextBlueprint.model";
import { MintContext } from "../../models/mint-nodes/MintContext.model";

import { TRender } from "../../types/TRender.type";

export const renderMContext: TRender = (
  blueprint: ContextBlueprint,
  parentElement,
  parentChildBlueprints,
  blueprintIndex
) => {
  const { mintNode, scope, parentBlueprint, _rootScope } = blueprint;

  const { collection: content } = mintNode as MintContext;

  const collection = generateBlueprints({
    nodes: content,
    scope,
    parentBlueprint,
    _rootScope
  });

  for (let x of collection) {
    renderBlueprints([x], parentElement, parentChildBlueprints, [blueprintIndex]);
  }

  blueprint.collection = collection;
};

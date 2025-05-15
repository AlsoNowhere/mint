import { ContextBlueprint } from "../../models/blueprint/ContextBlueprint.model";
import { MintContext } from "../../models/mint-nodes/MintContext.model";

import { TGenerate } from "../../types/TGenerate.type";

export const generateMContext: TGenerate = ({ node, scope, parentBlueprint, _rootScope }) => {
  const { mintNode } = node;
  const mintContext = mintNode as MintContext;

  if (!scope._mintBlueprint.contexts) {
    scope._mintBlueprint.contexts = {};
  }
  Object.assign(scope._mintBlueprint.contexts, mintContext.contexts);

  const blueprint = new ContextBlueprint({ mintNode: mintContext, scope, parentBlueprint, _rootScope });

  return blueprint;
};

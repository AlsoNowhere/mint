import { TemplateBlueprint } from "../../models/blueprint/TemplateBlueprint.model";
import { MintTemplate } from "../../models/mint-nodes/MintTemplate.model";

import { TGenerate } from "../../types/TGenerate.type";

export const generateMTemplate: TGenerate = ({ node, scope, parentBlueprint, _rootScope }) => {
  const { mintNode } = node;
  const mintTemplate = mintNode as MintTemplate;
  return new TemplateBlueprint({
    mintNode: mintTemplate,
    templateState: null,
    scope,
    parentBlueprint,
    _rootScope
  });
};

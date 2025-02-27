import { generateBlueprints } from "../generate/generate-blueprints.logic";
import { renderBlueprints } from "../render/render-blueprints.logic";

import { MintTemplate } from "../../models/mint-nodes/MintTemplate.model";
import { TemplateBlueprint } from "../../models/blueprint/TemplateBlueprint.model";
import { TextBlueprint } from "../../models/blueprint/TextBlueprint.model";

import { INode } from "../../interfaces/INode.interface";

import { MINT_ERROR } from "../../data/constants.data";

import { TRender } from "../../types/TRender.type";

export const renderMTemplate: TRender = (
  blueprint: TemplateBlueprint,
  parentElement,
  parentChildBlueprints,
  blueprintIndex
) => {
  const { mintNode, scope, parentBlueprint, _rootScope } = blueprint;

  let { options, templateGenerator, scopeLookup } = mintNode as MintTemplate;

  if (scopeLookup !== undefined) {
    templateGenerator = scope[scopeLookup];

    // <@ REMOVE FOR PRODUCTION
    if (!(templateGenerator instanceof Function)) {
      throw new Error(
        `${MINT_ERROR} -- node(template("target")) -- No function provided from "target". Make sure you write () => TMintContent not just TMintContent`
      );
    }
    // @>
  }

  const { conditionedBy } = options;

  blueprint.templateState = conditionedBy && scope[conditionedBy];

  const template: INode | Array<INode> = templateGenerator.apply(scope);

  let content: Array<INode>;

  if (template instanceof Array) {
    content = template;
  } else {
    content = [template];
  }

  const collection = generateBlueprints({
    nodes: content,
    scope,
    parentBlueprint,
    _rootScope,
  });

  // <@ REMOVE FOR PRODUCTION
  if (
    !!collection.find(
      (x) => x instanceof TextBlueprint && x.textValue === "_children"
    )
  ) {
    throw new Error(
      `${MINT_ERROR} cannot add "_children" as a child of mTemplate template.`
    );
  }
  // @>

  for (let x of collection) {
    renderBlueprints([x], parentElement, parentChildBlueprints, [
      blueprintIndex,
    ]);
  }

  blueprint.collection = collection;
};

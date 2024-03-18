import { generateTemplate } from "./generateTemplate.logic";

import { Template } from "../../models/Template.model";

import { IScope } from "../../interfaces/IScope.interface";

import { TMintContent } from "../../types/TMintContent.type";
import { TContext } from "../../types/TContext.type";

export const generateTemplates = (
  elements: Array<TMintContent>,
  parentTemplate: null | Template,
  scope: IScope,
  {
    isSVG = false,
    resolvedContext,
  }: {
    isSVG?: boolean;
    resolvedContext?: TContext;
  } = {}
): Array<Template> => {
  return elements
    .map((x) =>
      generateTemplate(x, parentTemplate, scope, { isSVG, resolvedContext })
    )
    .filter((x) => !!x) as Array<Template>;
};

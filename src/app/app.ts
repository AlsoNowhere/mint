import { renderTemplate } from "../logic/render/renderTemplate.logic";
import {
  generateTemplate,
  generateTemplates,
} from "../logic/template/generateTemplate.logic";

import { Template } from "../models/Template.model";
import { MintElement } from "../models/MintElement.model";

import { IScope } from "../interfaces/IScope.interface";

export const app = (
  rootElement: HTMLElement,
  rootScope: IScope,
  content: MintElement | string | Array<MintElement | string>
) => {
  const templates =
    content instanceof Array
      ? generateTemplates(content, null, rootScope)
      : [generateTemplate(content, null, rootScope)];

  if (templates.includes("_children")) {
    throw new Error(`Can only pass "_children" as child of Component.`);
  }

  (templates as Array<Template>).forEach((x: Template, i) =>
    renderTemplate(rootElement, x, templates as Array<Template>, i)
  );

  /* Dev */
  // console.log("DEV === APP === TEMPLATES: ", templates);
};

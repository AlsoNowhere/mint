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
  const existingElements = Array.from(rootElement.children);

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

  const deleteApp = () => {
    Array.from(rootElement.children).forEach((x) => {
      if (existingElements.includes(x)) return;
      rootElement.removeChild(x);
    });
  };

  return {
    deleteApp,
  };

  /* Dev */
  // console.log("DEV === APP === TEMPLATES: ", templates);
};

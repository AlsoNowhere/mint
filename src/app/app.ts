import { renderTemplate } from "../logic/render/renderTemplate.logic";
import { generateTemplate } from "../logic/template/generateTemplate.logic";
import { currentlyTemplating } from "../logic/refresh/refresh.logic";
import { generateTemplates } from "../logic/template/generateTemplates.logic";

import { Template } from "../models/Template.model";
import { MintElement } from "../models/MintElement.model";

import { IScope } from "../interfaces/IScope.interface";

import { MINT_ERROR } from "../data/constants.data";

export const app = <T>(
  rootElement: HTMLElement,
  rootScope: IScope & T,
  content: MintElement | string | Array<MintElement | string>
) => {
  const existingElements = Array.from(rootElement.children);

  rootScope.onpretemplate?.();

  const templates =
    content instanceof Array
      ? generateTemplates(content, null, rootScope)
      : [generateTemplate(content, null, rootScope)];

  if (templates.includes("_children")) {
    throw new Error(
      `${MINT_ERROR} Can only pass "_children" as child of Component.`
    );
  }

  rootScope.oninit?.();
  rootScope.oninsert?.();
  rootScope.oneach?.();

  currentlyTemplating.push(0);
  (templates as Array<Template>).forEach((x: Template, i) =>
    renderTemplate(rootElement, x, templates as Array<Template>, i)
  );
  currentlyTemplating.pop();

  const deleteApp = () => {
    Array.from(rootElement.children).forEach((x) => {
      if (existingElements.includes(x)) return;
      rootElement.removeChild(x);
    });
  };

  /* Dev */
  // console.log("DEV === APP === TEMPLATES: ", templates);

  return { deleteApp };
};

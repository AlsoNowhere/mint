import { renderTemplate } from "../renderTemplate.logic";

import { Template } from "../../../models/Template.model";
import { IF_Template } from "../../../models/IF_Template.model";
import { FOR_Template } from "../../../models/FOR_Template.model";

export const addList = (
  list: Array<Template>,
  templates: Array<Template | IF_Template | FOR_Template>,
  rootElement: HTMLElement | SVGElement,
  templateIndex: number
) => {
  list.forEach((x) => {
    renderTemplate(rootElement, x, templates, templateIndex);
  });
};

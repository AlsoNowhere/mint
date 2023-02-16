import { renderTextTemplate } from "./renderTextTemplate.logic";
import { renderElementTemplate } from "./renderElementTemplate.logic";
import { renderComponentTemplate } from "./renderComponentTemplate.logic";
import { addList } from "./mFor/addList.logic";

import { Template } from "../../models/Template.model";
import { IF_Template } from "../../models/IF_Template.model";
import { FOR_Template } from "../../models/FOR_Template.model";

export const renderTemplate = (
  rootElement: HTMLElement | SVGElement,
  template: Template,
  templates: Array<Template | IF_Template | FOR_Template>,
  templateIndex: number
): void => {
  if (template.textNode !== undefined) {
    return renderTextTemplate(template, rootElement);
  }
  if (template.element !== undefined) {
    return renderElementTemplate(
      template,
      rootElement,
      templates,
      templateIndex
    );
  }
  if (template.component !== undefined) {
    return renderComponentTemplate(
      template,
      rootElement,
      templates,
      templateIndex
    );
  }
  if (template instanceof FOR_Template) {
    addList(
      template.mFor.currentForRenders,
      templates,
      rootElement,
      templateIndex
    );
  }
};

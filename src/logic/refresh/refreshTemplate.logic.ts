import { refreshTextNode } from "./refreshTextNode.logic";
import { refreshElementTemplate } from "./refreshElementTemplate.logic";
import { refreshComponentTemplate } from "./refreshComponentTemplate.logic";
import { refreshMIf } from "./mIf/refreshMIf.logic";
import { refreshMFor } from "./mFor/refreshMFor.logic";
import { generateTemplate } from "../template/generateTemplate.logic";
import { renderTemplate } from "../render/renderTemplate.logic";

import { Template } from "../../models/Template.model";
import { IF_Template } from "../../models/IF_Template.model";
import { FOR_Template } from "../../models/FOR_Template.model";

export const refreshTemplate = (
  rootElement: HTMLElement | SVGElement,
  template: Template | IF_Template | FOR_Template,
  templates: Array<Template | IF_Template>,
  templateIndex: number,
  { inserted }: { inserted: boolean }
) => {
  /* Dev */
  // console.log("DEV === REFRESH === Refresh template: ", template);

  if (
    template instanceof Template &&
    template.mTemplate !== undefined &&
    template.mTemplate.refreshOnEach
  ) {
    const content = (template.scope as any)[template.mTemplate.target];
    const newTemplate = generateTemplate(
      content,
      template.parentTemplate,
      template.scope,
      { mTemplate: template.mTemplate }
    );

    template.element?.parentElement?.removeChild(template.element);

    templates.splice(templateIndex, 1, newTemplate as Template);

    renderTemplate(
      rootElement,
      newTemplate as Template,
      templates,
      templateIndex
    );
    return;
  }

  if (template instanceof Template && template.textNode !== undefined) {
    return refreshTextNode(template);
  }

  if (
    template instanceof IF_Template ||
    (template instanceof Template && template.mIf !== undefined)
  ) {
    const { oldState, newState } = refreshMIf(
      rootElement,
      template,
      templateIndex
    );
    if (newState === false) return;
    if (template.isComponent && oldState === false && newState === true) {
      inserted = true;
    }
  }

  if (template instanceof FOR_Template) {
    refreshMFor(template, templates, templateIndex, { inserted });
    return;
  }

  if (template instanceof Template && template.element !== undefined) {
    return refreshElementTemplate(template, { inserted });
  }

  if (template instanceof Template && template.component !== undefined) {
    return refreshComponentTemplate(template, { inserted });
  }
};

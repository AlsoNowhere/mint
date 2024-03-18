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
import { Template_Template } from "../../models/Template_Template.model";

import { IComponentTemplate } from "../../interfaces/template/IComponentTemplate.interface";
import { IElementTemplate } from "../../interfaces/template/IElementTemplate.interface";

import { TElement } from "../../types/TElement.type";

export const refreshTemplate = (
  rootElement: HTMLElement | SVGElement,
  _template: Template | Template_Template | IF_Template | FOR_Template,
  templates: Array<Template | IF_Template>,
  templateIndex: number,
  { inserted }: { inserted: boolean }
) => {
  /* Dev */
  // console.log("DEV === REFRESH === Refresh template: ", _template);

  let template: Template | IF_Template | FOR_Template;

  if (_template instanceof Template_Template) {
    template = generateTemplate(
      _template.mintTemplate,
      _template.parentTemplate,
      _template.scope,
      { isSVG: _template.isSVG }
    ) as Template;
    if (template instanceof Template_Template) return;
  } else {
    template = _template;
  }

  if (template instanceof Template && template.mTemplate !== undefined) {
    const replace =
      template.mTemplate.replaceCondition?.apply(template.scope) ??
      template.mTemplate.refreshOnEach;

    /* Dev */
    // console.log("DEV === REFRESH === Refresh MintTemplate: ", template);

    if (!replace) return;

    if (template.parentTemplate === null) return;
    const { mTemplate } = template;

    const content =
      (template.scope as any)[template.mTemplate.target] ||
      (template.parentTemplate.scope as any)[template.mTemplate.target];

    const isComponent = !!template.componentElement;

    if (isComponent) {
      template.componentElement?.parentElement?.removeChild(
        template.componentElement
      );
    } else {
      template.element?.parentElement?.removeChild(template.element);
    }

    if (content === undefined) return;

    const newTemplate = generateTemplate(
      content,
      template.parentTemplate,
      template.scope,
      { mTemplate }
    );

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

  if (template instanceof Template) {
    const _template = template as IElementTemplate | IComponentTemplate;

    if (template instanceof Template && template.element !== undefined) {
      refreshElementTemplate(template, { inserted });
    }

    if (template instanceof Template && template.component !== undefined) {
      refreshComponentTemplate(template, { inserted });
    }

    _template.templates.forEach((x, i) => {
      const target =
        x.parentTemplate?.componentElement || x.parentTemplate?.element;
      refreshTemplate(target as TElement, x, _template.templates, i, {
        inserted,
      });
    });

    return;
  }
};

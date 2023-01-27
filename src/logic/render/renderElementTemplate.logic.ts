import { addElement } from "../../services/addElement.service";

import { renderAttributes } from "./attributes/renderAttributes.logic";
import { renderTemplate } from "./renderTemplate.logic";

import { Template } from "../../models/Template.model";
import { IF_Template } from "../../models/IF_Template.model";
import { FOR_Template } from "../../models/FOR_Template.model";

import { IElementTemplate } from "../../interfaces/template/IElementTemplate.interface";

export const renderElementTemplate = (
  template: Template,
  rootElement: HTMLElement | SVGElement,
  templates: Array<Template | IF_Template | FOR_Template>,
  templateIndex: number
) => {
  const _template = template as IElementTemplate;

  /* Dev */
  // console.log("DEV === RENDER ELEMENT: ", _template);

  if (_template.mIf !== undefined && _template.mIf.state === false) return;

  renderAttributes(_template.element, _template.attributes, _template.scope);

  addElement(_template.element, templates, rootElement, templateIndex);

  _template.templates.forEach((x: Template, i: number) =>
    renderTemplate(
      _template.element as HTMLElement | SVGElement,
      x,
      _template.templates,
      i
    )
  );
};

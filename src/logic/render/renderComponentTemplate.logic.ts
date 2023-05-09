import { addElement } from "../../services/addElement.service";

import { renderAttributes } from "./attributes/renderAttributes.logic";
import { renderTemplate } from "./renderTemplate.logic";

import { Template } from "../../models/Template.model";
import { IF_Template } from "../../models/IF_Template.model";
import { FOR_Template } from "../../models/FOR_Template.model";

import { IComponentTemplate } from "../../interfaces/template/IComponentTemplate.interface";

export const renderComponentTemplate = (
  template: Template,
  rootElement: HTMLElement | SVGElement,
  templates: Array<Template | IF_Template | FOR_Template>,
  templateIndex: number
) => {
  /* Dev */
  // console.log("DEV === RENDER === COMPONENT: ", template);

  const _template = template as IComponentTemplate;

  if (_template.mIf !== undefined && _template.mIf.state === false) return;

  _template.scope.oninit?.();
  _template.scope.oninsert?.();
  _template.scope.oneach?.();

  renderAttributes(
    _template.componentElement,
    _template.attributes,
    _template.scope
  );

  addElement(_template.componentElement, templates, rootElement, templateIndex);

  _template.templates?.forEach((x: Template, i: number) =>
    renderTemplate(_template.componentElement, x, _template.templates, i)
  );

  _template.scope.onafterinsert?.({ props: _template.props });

  return;
};

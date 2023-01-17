import { addElement } from "../../../services/addElement.service";

import { renderTemplate } from "../../render/renderTemplate.logic";
import { generateTemplate } from "../../template/generateTemplate.logic";

import { Template } from "../../../models/Template.model";
import { IF_Template } from "../../../models/IF_Template.model";

export const refreshMIf = (
  rootElement: HTMLElement | SVGElement,
  template: Template | IF_Template,
  templateIndex: number
) => {
  const { mIf, parentTemplate, scope, isComponent } = template;
  if (mIf === undefined || parentTemplate === null) return;

  const oldState = mIf.state;

  const { ifValue, inverse } = mIf;

  const checkScope = isComponent ? parentTemplate.scope : scope;

  const state: boolean = (checkScope as any)[ifValue];
  mIf.state = inverse ? !state : !!state;

  const newState = mIf.state;

  /* Dev */
  // const states = { old: oldState, new: newState };
  // console.log("DEV === REFRESH === mIf: ", rootElement, template, states);

  if (oldState !== newState) {
    // Was previously NOT rendered.
    if (oldState === false) {
      let newTemplate: Template = template as Template;

      if (mIf.templated === false) {
        const _template = template as IF_Template;

        newTemplate = generateTemplate(
          _template.mintElement,
          _template.parentTemplate,
          _template.scope,
          { isSVG: _template.isSVG }
        ) as Template;

        newTemplate.mIf = template.mIf;

        parentTemplate.templates.splice(templateIndex, 1, newTemplate);

        mIf.templated = true;
        rootElement !== undefined &&
          renderTemplate(
            rootElement,
            newTemplate,
            parentTemplate.templates,
            templateIndex
          );
        return false;
      } else {
        const _template = template as Template;
        const element = _template.componentElement || _template.element;
        element !== undefined &&
          _template.parentTemplate !== null &&
          addElement(
            element,
            _template.parentTemplate.templates,
            rootElement,
            templateIndex
          );
      }
    } else if (template instanceof Template) {
      const element = template.element || template.componentElement;
      // WAS previously rendered.
      element?.parentElement?.removeChild(element);
    }
  }

  return newState;
};

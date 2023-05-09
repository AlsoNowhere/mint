import { addElement } from "../../../services/addElement.service";

import { generateTemplate } from "../../template/generateTemplate.logic";
import { renderTemplate } from "../../render/renderTemplate.logic";

import { Template } from "../../../models/Template.model";
import { IF_Template } from "../../../models/IF_Template.model";

export const refreshMIf = (
  rootElement: HTMLElement | SVGElement,
  template: Template | IF_Template,
  templateIndex: number
): {
  oldState?: boolean;
  newState: boolean | undefined;
} => {
  const { mIf, parentTemplate, scope, isComponent } = template;
  if (mIf === undefined || parentTemplate === null)
    return { newState: undefined };

  const oldState = mIf.state;

  const { ifValue, inverse } = mIf;

  const checkScope = isComponent ? parentTemplate.scope : scope;

  const state: boolean = (checkScope as any)[ifValue];
  mIf.state = inverse ? !state : !!state;

  const newState = mIf.state;

  /* Dev */
  // console.log("DEV === REFRESH === mIf: ", template, oldState, newState);

  if (oldState !== newState) {
    // Change in state -> Do something
    if (oldState === false) {
      // WAS NOT previously rendered -> Add
      let newTemplate: Template = template as Template;

      if (mIf.templated === false) {
        // WAS NOT previously templated -> Template first, then Add
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
        return { newState: false };
      } else {
        // WAS previously templated -> Add back
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
      // WAS previously rendered -> Remove
      const element = template.element || template.componentElement;
      element?.parentElement?.removeChild(element);
    }
  }

  return { oldState, newState };
};

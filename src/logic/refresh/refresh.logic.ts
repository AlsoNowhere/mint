import { refreshTemplate } from "./refreshTemplate.logic";

import { Template } from "../../models/Template.model";

import { IScope } from "../../interfaces/IScope.interface";
import { IStore } from "../../interfaces/IStore.interface";
import { IF_Template } from "../../models/IF_Template.model";

import { currentlyTemplating } from "../../data/constants.data";

const getTemplate = (scope: IScope): false | Template => {
  if (!(scope instanceof Object)) return false;

  if (
    scope._mintTemplate !== undefined &&
    scope._mintTemplate instanceof Template
  )
    return scope._mintTemplate;

  if (
    scope._component !== undefined &&
    scope._component !== null &&
    scope._component._mintTemplate instanceof Template
  )
    return scope._component._mintTemplate;

  return false;
};

export const refresh = (
  scopeOrTemplate: IScope | IStore | Template | IF_Template
) => {
  if (currentlyTemplating.state) {
    console.warn(
      "WARNING: refresh() detected while still templating, refresh ignored."
    );
    return;
  }

  if (
    scopeOrTemplate instanceof Template ||
    scopeOrTemplate instanceof IF_Template
  ) {
    const template = scopeOrTemplate;

    if (template.parentTemplate === null) return;

    const output = refreshTemplate(
      (template.scope._mintTemplate?.componentElement ||
        template.scope._mintTemplate?.element) as HTMLElement | SVGElement,

      scopeOrTemplate,
      template.parentTemplate?.templates,
      template.parentTemplate?.templates.indexOf(template)
    );

    return output;
  }
  const template = getTemplate(scopeOrTemplate);

  if (template === false) return;

  template.templates.forEach((x, i) => {
    refreshTemplate(
      (template.scope._mintTemplate?.componentElement ||
        template.scope._mintTemplate?.element) as HTMLElement | SVGElement,
      x,
      template.templates,
      i
    );
  });
};

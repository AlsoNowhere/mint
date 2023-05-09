import { refreshTemplate } from "./refreshTemplate.logic";

import { IF_Template } from "../../models/IF_Template.model";
import { Template } from "../../models/Template.model";

import { IScope } from "../../interfaces/IScope.interface";
import { IStore } from "../../interfaces/IStore.interface";

export const currentlyTemplating: Array<
  IScope | IStore | Template | IF_Template
> = [];

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

let refresh_id = 0;

export const refresh = (
  scopeOrTemplate: IScope | IStore | Template | IF_Template
) => {
  const id = refresh_id++;

  // console.log(" -- DEBUG -- Refresh START", id);

  if (currentlyTemplating.includes(scopeOrTemplate)) {
    console.warn(
      "WARNING: refresh() detected while still templating, refresh ignored."
    );
    return;
  }

  currentlyTemplating.push(scopeOrTemplate);

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
      template.parentTemplate?.templates.indexOf(template),
      { inserted: false }
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
      i,
      { inserted: false }
    );
  });

  {
    const index = currentlyTemplating.indexOf(scopeOrTemplate);
    currentlyTemplating.splice(index, 1);
  }

  // console.log(" -- DEBUG -- Refresh END", id);
};

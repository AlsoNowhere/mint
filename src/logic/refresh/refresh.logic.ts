import { refreshTemplate } from "./refreshTemplate.logic";

import { IF_Template } from "../../models/IF_Template.model";
import { Template } from "../../models/Template.model";

import { IScope } from "../../interfaces/IScope.interface";
import { IStore } from "../../interfaces/IStore.interface";

export const currentlyTemplating: Array<
  IScope | IStore | Template | IF_Template | number
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

// let refresh_id = 0;

export const refresh = (
  scopeOrTemplate: IScope | IStore | Template | IF_Template
) => {
  // {
  // const id = refresh_id++;
  // console.log("DEV -- Refresh START", id);
  // }

  // console.log("DEV === refresh === ", scopeOrTemplate);
  // console.trace();

  const focusTarget = document.activeElement;

  if (
    currentlyTemplating.includes(scopeOrTemplate) ||
    currentlyTemplating.includes(0)
  ) {
    console.warn(
      "MINT WARNING: refresh() detected while still templating, refresh ignored."
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

    refreshTemplate(
      (template.scope._mintTemplate?.componentElement ||
        template.scope._mintTemplate?.element) as HTMLElement | SVGElement,
      scopeOrTemplate,
      template.parentTemplate?.templates,
      template.parentTemplate?.templates.indexOf(template),
      { inserted: false }
    );

    return;
  }

  const scope: IScope = scopeOrTemplate;
  const template = getTemplate(scope);
  if (template === false) return;

  // console.log("DEV === refresh-template === ", template);

  refreshTemplate(
    (template.componentElement || template.element) as HTMLElement | SVGElement,
    template,
    template.parentTemplate?.templates ?? [],
    template.parentTemplate?.templates.indexOf(template) || -1,
    { inserted: false }
  );

  {
    const index = currentlyTemplating.indexOf(scope);
    currentlyTemplating.splice(index, 1);
  }

  if (
    focusTarget !== null &&
    focusTarget !== document.activeElement &&
    document.body.contains(focusTarget)
  ) {
    (focusTarget as HTMLElement).focus();
  }

  // console.log("DEV -- Refresh END", id);
};

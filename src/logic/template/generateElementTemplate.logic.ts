import { resolveChildren } from "../../services/resolveChildren.service";

import { generateTemplates } from "./generateTemplates.logic";

import { MintElement } from "../../models/MintElement.model";
import { Template } from "../../models/Template.model";
import { UpwardRef } from "../../models/UpwardRef.model";
import { Context } from "../../models/Context.model";

import { IElement } from "../../interfaces/mintElement/IElement.interface";
import { IScope } from "../../interfaces/IScope.interface";
import { I_mIf } from "../../interfaces/I_mIf.interface";
import { I_mFor } from "../../interfaces/I_mFor.interface";
import { I_mRef } from "../../interfaces/I_mRef.interface";
import { I_mTemplate } from "../../interfaces/I_mTemplate.interface";

import { TContext } from "../../types/TContext.type";

export const generateElementTemplate = (
  mintElement: MintElement,
  parentTemplate: null | Template,
  rootScope: IScope,
  { isSVG }: { isSVG: boolean },
  {
    mIf,
    mFor,
    mRef,
    mTemplate,
    resolvedContext,
    context,
  }: {
    mIf?: I_mIf;
    mFor?: I_mFor;
    mRef?: I_mRef;
    mTemplate?: I_mTemplate;
    resolvedContext?: TContext;
    context?: Context;
  } = {}
) => {
  const _mintElement = mintElement as IElement;

  let content = _mintElement.content;

  _mintElement.element === "svg" && (isSVG = true);

  const element = isSVG
    ? document.createElementNS(
        "http://www.w3.org/2000/svg",
        _mintElement.element
      )
    : document.createElement(_mintElement.element);

  if (mRef) {
    const value = (rootScope as any)[mRef.refValue];
    if (value instanceof UpwardRef) {
      value.ref = element;
    } else {
      (rootScope as any)[mRef.refValue] = element;
    }
  }

  /* Dev */
  // console.log("DEV === GENERATE === Element: ", _mintElement);

  const template = new Template({
    element,
    attributes: _mintElement.attributes,
    scope: rootScope,
    parentTemplate,
    mIf,
    mFor,
    mRef,
    mTemplate,
    mintElement,
    context,
  });

  const templates = !!content
    ? generateTemplates(content, template, rootScope, {
        isSVG,
        resolvedContext,
      })
    : [];
  template.templates = templates;
  template.templates = resolveChildren(template, templates);
  return template;
};

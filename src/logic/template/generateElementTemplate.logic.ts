import { resolveChildren } from "../../services/resolveChildren.service";

import { generateTemplates } from "./generateTemplate.logic";

import { MintElement } from "../../models/MintElement.model";
import { Template } from "../../models/Template.model";

import { IElement } from "../../interfaces/mintElement/IElement.interface";
import { IScope } from "../../interfaces/IScope.interface";
import { I_mIf } from "../../interfaces/I_mIf.interface";
import { I_mFor } from "../../interfaces/I_mFor.interface";
import { I_mRef } from "../../interfaces/I_mRef.interface";
import { I_mTemplate } from "../../interfaces/I_mTemplate.interface";

export const generateElementTemplate = (
  mintElement: MintElement,
  parentTemplate: null | Template,
  rootScope: IScope,
  { isSVG }: { isSVG: boolean },
  { mIf, mFor, mRef }: { mIf?: I_mIf; mFor?: I_mFor; mRef?: I_mRef }
) => {
  const _mintElement = mintElement as IElement;

  let mTemplate: I_mTemplate | undefined;
  let content: Array<MintElement | string> | undefined = _mintElement.content;

  const element =
    _mintElement.element === "svg" || isSVG
      ? document.createElementNS(
          "http://www.w3.org/2000/svg",
          _mintElement.element
        )
      : document.createElement(_mintElement.element);

  _mintElement.element === "svg" && (isSVG = true);

  if (mRef) {
    (rootScope as any)[mRef.refValue] = element;
  }

  if (!!(_mintElement.attributes as any)["m-template"]) {
    mTemplate = {
      value: (_mintElement.attributes as any)["m-template"],
    };
    content = undefined;
    delete (_mintElement.attributes as any)["m-template"];
  }

  /* Dev */
  // console.log("DEV === GENERATE === Element: ", _mintElement, element);

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
  });

  const templates = !!content
    ? generateTemplates(content, template, rootScope, isSVG)
    : [];
  template.templates = templates;
  template.templates = resolveChildren(template, templates);
  return template;
};
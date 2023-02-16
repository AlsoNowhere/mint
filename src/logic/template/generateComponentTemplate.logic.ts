import { resolveChildren } from "../../services/resolveChildren.service";
import { cloneContent } from "../../services/cloneContent.service";
import { cloneAttributes } from "../../services/cloneAttributes.service";

import { generateTemplates } from "./generateTemplate.logic";
import { templateProps } from "./component/templateProps.logic";

import { MintElement } from "../../models/MintElement.model";
import { Template } from "../../models/Template.model";
import { Base } from "../../models/Base.model";

import { IComponent } from "../../interfaces/mintElement/IComponent.interface";
import { IScope } from "../../interfaces/IScope.interface";
import { I_mIf } from "../../interfaces/I_mIf.interface";
import { I_mFor } from "../../interfaces/I_mFor.interface";
import { I_mRef } from "../../interfaces/I_mRef.interface";
import { I_mTemplate } from "../../interfaces/I_mTemplate.interface";

import { TMintContent } from "../../types/TMintContent.type";

export const generateComponentTemplate = (
  mintElement: MintElement,
  parentTemplate: null | Template,
  rootScope: IScope & { __name?: "_ForData" },
  { isSVG, isMFor }: { isSVG: boolean; isMFor: boolean },
  {
    mIf,
    mFor,
    mRef,
    mTemplate,
  }: { mIf?: I_mIf; mFor?: I_mFor; mRef?: I_mRef; mTemplate?: I_mTemplate }
) => {
  const _mintElement = mintElement as IComponent;

  const { attributes } = _mintElement.component.mintElement;

  if (
    !(_mintElement.component.scope instanceof Function) &&
    _mintElement.component.scope !== null
  ) {
    throw new Error(
      'Mint Component -- scope -- must pass a constructor function for Component scope argument (second argument) i.e component("div", function(){}'
    );
  }

  const componentElement =
    _mintElement.component.mintElement.element === "svg" || isSVG
      ? document.createElementNS(
          "http://www.w3.org/2000/svg",
          _mintElement.component.mintElement.element
        )
      : document.createElement(_mintElement.component.mintElement.element);

  _mintElement.component.mintElement.element === "svg" && (isSVG = true);

  const scope: IScope = isMFor
    ? rootScope
    : new (_mintElement.component.scope ?? Base)();

  if (mRef) {
    (scope as any)[mRef.refValue] = componentElement;
  } else if ((attributes as any)["m-ref"]) {
    const refValue = (attributes as any)["m-ref"];
    delete (attributes as any)["m-ref"];
    mRef = { refValue, scope };
    (scope as any)[mRef.refValue] = componentElement;
  }

  /* Dev */
  // console.log("DEV === GENERATE === COMPONENT: ", _mintElement);

  !mFor &&
    templateProps(scope, _mintElement.props, parentTemplate?.scope || {});

  const mintElementContent = _mintElement.content;

  const template = new Template({
    component: _mintElement.component,
    content: generateTemplates(
      mintElementContent.map((x: TMintContent) => cloneContent(x)),
      parentTemplate,
      scope,
      isSVG
    ),
    props: _mintElement.props,
    scope,
    parentTemplate,
    mIf,
    mFor,
    mRef,
    mTemplate,
    componentElement,
    attributes: cloneAttributes(_mintElement.component.mintElement),
    mintElement,
  });

  const componentContent = _mintElement.component.mintElement.content;

  const templates = generateTemplates(
    componentContent.map((x: TMintContent) => cloneContent(x)),
    template,
    scope,
    isSVG
  );

  template.templates = templates;
  template.templates = resolveChildren(template, templates);

  scope._mintTemplate = template;

  return template;
};

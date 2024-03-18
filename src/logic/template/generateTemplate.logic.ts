import { element } from "../../services/element.service";

import { generateComponentTemplate } from "./generateComponentTemplate.logic";
import { generateTextTemplate } from "./generateTextTemplate.logic";
import { generateElementTemplate } from "./generateElementTemplate.logic";
import { generateMIf } from "./mIf/generateMIf.logic";
import { generateMFor } from "./mFor/generateMFor.logic";
import { assignProps } from "../common/assign-props.logic";

import { MintComponent } from "../../models/MintComponent.model";
import { MintElement } from "../../models/MintElement.model";
import { MintTemplate } from "../../models/MintTemplate.model";
import { Template } from "../../models/Template.model";
import { IF_Template } from "../../models/IF_Template.model";
import { FOR_Template } from "../../models/FOR_Template.model";
import { Template_Template } from "../../models/Template_Template.model";
import { Context } from "../../models/Context.model";

import { IScope } from "../../interfaces/IScope.interface";
import { I_mFor } from "../../interfaces/I_mFor.interface";
import { I_mIf } from "../../interfaces/I_mIf.interface";
import { I_mRef } from "../../interfaces/I_mRef.interface";
import { I_mTemplate } from "../../interfaces/I_mTemplate.interface";

import { MINT_ERROR } from "../../data/constants.data";

import { TMintContent } from "../../types/TMintContent.type";
import { TContext } from "../../types/TContext.type";
import { TFOR_Type } from "../../types/TFOR_Type.type";

interface IAttributes {
  isSVG?: boolean;
  isMFor?: boolean;
  mTemplate?: I_mTemplate;
  resolvedContext?: TContext;
}

export const generateTemplate = (
  mintElement: TMintContent,
  parentTemplate: null | Template,
  rootScope: IScope,
  {
    isSVG = false,
    isMFor = false,
    mTemplate = undefined,
    resolvedContext = undefined,
  }: IAttributes = {
    isSVG: false,
    isMFor: false,
    mTemplate: undefined,
    resolvedContext: undefined,
  }
):
  | Template
  | Template_Template
  | IF_Template
  | FOR_Template
  | string
  | undefined => {
  if (mintElement instanceof Context) {
    const _resolvedContext = {};
    Object.assign(_resolvedContext, resolvedContext || ({} as TContext));
    assignProps(_resolvedContext, mintElement.context, rootScope, "template");
    const newElement = element(mintElement.element, null, mintElement.content);
    return generateElementTemplate(
      newElement,
      parentTemplate,
      rootScope,
      {
        isSVG,
      },
      {
        resolvedContext: _resolvedContext,
        context: mintElement,
      }
    );
  }

  if (mintElement instanceof MintTemplate) {
    const mintTemplate = mintElement;
    const content = (rootScope as any)[mintTemplate.target];
    if (content instanceof Array) {
      throw new Error(
        `${MINT_ERROR} Template output was Array. Template output from template(target) can be MintElement only.`
      );
    }
    if (
      content !== undefined &&
      !(content instanceof MintElement) &&
      typeof content !== "string"
    ) {
      throw new Error(
        `${MINT_ERROR} Template output not one of the following: undefined, MintElement, string`
      );
    }
    if (content === undefined) {
      return new Template_Template({
        mintTemplate,
        parentTemplate,
        scope: rootScope,
        isSVG,
      });
    }
    const { target, refreshOnEach, replaceCondition } = mintTemplate;
    const options = {
      isSVG,
      isMFor,
      mTemplate: { target, refreshOnEach, replaceCondition },
    };
    const template = generateTemplate(
      content,
      parentTemplate,
      rootScope,
      options
    );
    return template;
  }

  if (mintElement === "_children") {
    return mintElement;
  }

  if (typeof mintElement === "string") {
    return generateTextTemplate(mintElement, parentTemplate, rootScope);
  }

  let mIf: I_mIf | undefined;
  let mFor: I_mFor | undefined;
  let mRef: I_mRef | undefined;
  let template: Template;

  const { attributes, props } = mintElement;

  const properties = attributes || props;

  if (!!(properties as any).mIf) {
    const ifValue: string = (properties as any).mIf;

    delete ((attributes || props) as any).mIf;

    mIf = generateMIf(mintElement, ifValue, rootScope);
    if (mIf.state === false)
      return new IF_Template({
        mintElement,
        parentTemplate,
        scope: rootScope,
        isSVG,
        mIf,
        isComponent: !!mintElement.component,
      });
  }

  if (!!(properties as any).mFor) {
    const forKey: string = (properties as any).mKey;

    if (forKey === undefined || forKey === "") {
      console.error(mintElement);
      throw new Error(`${MINT_ERROR} mFor must have a mKey attribute`);
    }

    const forValue: string = (properties as any).mFor;
    const mForType: TFOR_Type = (properties as any).mForType;
    delete ((attributes || props) as any).mFor;
    delete ((attributes || props) as any).mKey;
    delete ((attributes || props) as any).mForType;

    const isComponent = !!mintElement.component;
    mFor = generateMFor(
      forKey,
      forValue,
      mintElement,
      rootScope,
      parentTemplate,
      { isComponent, mForType, isSVG }
    );
    return new FOR_Template({
      mintElement,
      parentTemplate,
      scope: rootScope,
      isSVG,
      mFor,
      isComponent,
    });
  }

  if (!!(properties as any).mRef) {
    const refValue = (properties as any).mRef;
    delete ((attributes || props) as any).mRef;
    mRef = {
      refValue,
      scope: rootScope || parentTemplate?.scope,
    };
  }

  if (mintElement.component instanceof MintComponent) {
    template = generateComponentTemplate(
      mintElement,
      parentTemplate,
      rootScope,
      { isSVG, isMFor },
      {
        mIf,
        mFor,
        mRef,
        mTemplate,
        resolvedContext,
      }
    );
  } else {
    template = generateElementTemplate(
      mintElement,
      parentTemplate,
      rootScope,
      { isSVG },
      { mIf, mFor, mRef, mTemplate, resolvedContext }
    );
  }

  // console.log("DEV -- Template: ", template);

  return template;
};

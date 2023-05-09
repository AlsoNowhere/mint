import { generateComponentTemplate } from "./generateComponentTemplate.logic";
import { generateTextTemplate } from "./generateTextTemplate.logic";
import { generateElementTemplate } from "./generateElementTemplate.logic";
import { generateMIf } from "./mIf/generateMIf.logic";
import { generateMFor } from "./mFor/generateMFor.logic";

import { MintComponent } from "../../models/MintComponent.model";
import { MintElement } from "../../models/MintElement.model";
import { MintTemplate } from "../../models/MintTemplate.model";
import { Template } from "../../models/Template.model";
import { IF_Template } from "../../models/IF_Template.model";
import { FOR_Template } from "../../models/FOR_Template.model";

import { IScope } from "../../interfaces/IScope.interface";
import { I_mFor } from "../../interfaces/I_mFor.interface";
import { I_mIf } from "../../interfaces/I_mIf.interface";
import { I_mRef } from "../../interfaces/I_mRef.interface";
import { I_mTemplate } from "../../interfaces/I_mTemplate.interface";

interface IAttributes {
  isSVG?: boolean;
  isMFor?: boolean;
  mTemplate?: I_mTemplate;
}

export const generateTemplate = (
  mintElement: MintElement | MintTemplate | string,
  parentTemplate: null | Template,
  rootScope: IScope,
  { isSVG = false, isMFor = false, mTemplate = undefined }: IAttributes = {
    isSVG: false,
    isMFor: false,
    mTemplate: undefined,
  }
): Template | IF_Template | FOR_Template | string | undefined => {
  if (mintElement instanceof MintTemplate) {
    const content = (rootScope as any)[mintElement.target];
    if (content instanceof MintElement) {
      return generateTemplate(content, parentTemplate, rootScope, {
        isSVG,
        isMFor,
        mTemplate: {
          target: mintElement.target,
          refreshOnEach: mintElement.refreshOnEach,
        },
      });
    }
    return undefined;
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

  if (!!(properties as any)["m-if"]) {
    const ifValue: string = (properties as any)["m-if"];
    delete ((attributes || props) as any)["m-if"];
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

  if (!!(properties as any)["m-for"]) {
    const forKey: string = (properties as any)["m-key"];

    if (forKey === undefined || forKey === "")
      throw new Error("m-for must have a m-key attribute");

    const forValue: string = (properties as any)["m-for"];
    delete ((attributes || props) as any)["m-for"];
    delete ((attributes || props) as any)["m-key"];
    const isComponent = !!mintElement.component;
    mFor = generateMFor(
      forKey,
      forValue,
      mintElement,
      rootScope,
      parentTemplate,
      { isComponent, isSVG }
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

  if (!!(properties as any)["m-ref"]) {
    const refValue = (properties as any)["m-ref"];
    delete ((attributes || props) as any)["m-ref"];
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
      }
    );
  } else {
    template = generateElementTemplate(
      mintElement,
      parentTemplate,
      rootScope,
      { isSVG },
      { mIf, mFor, mRef, mTemplate }
    );
  }

  // console.log(" -- DEBUG -- Template: ", template);

  return template;
};

export const generateTemplates = (
  elements: Array<MintElement | string>,
  parentTemplate: null | Template,
  scope: IScope,
  isSVG = false
): Array<Template> => {
  return elements
    .map((x) => generateTemplate(x, parentTemplate, scope, { isSVG }))
    .filter((x) => !!x) as Array<Template>;
};

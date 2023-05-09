import { generateForTemplates } from "./generateForTemplates.logic";

import { MintElement } from "../../../models/MintElement.model";
import { Template } from "../../../models/Template.model";

import { IScope } from "../../../interfaces/IScope.interface";
import { I_mFor } from "../../../interfaces/I_mFor.interface";

export const generateMFor = (
  forKey: string,
  forValue: string,
  mintElement: MintElement,
  scope: IScope,
  parentTemplate: null | Template,
  variants: {
    isComponent?: boolean;
    isSVG?: boolean;
  } = { isComponent: false, isSVG: false }
): I_mFor => {
  const _forData = (scope as any)[forValue];

  if (!(_forData instanceof Array) && _forData !== undefined) {
    throw new Error("Must pass in an Array or undefined to m-for");
  }

  const forData = _forData instanceof Array ? [..._forData] : [];

  const currentForRenders = generateForTemplates(
    mintElement,
    parentTemplate,
    scope,
    forData,
    variants
  );

  return {
    forKey,
    forValue,
    mintElement,
    scope,
    forData,
    currentForRenders,
    oldForDataLength: forData.length,
  };
};

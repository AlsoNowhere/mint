import { checkUnique } from "../../../services/check-unique.service";

import { generateForTemplates } from "./generateForTemplates.logic";

import { MintElement } from "../../../models/MintElement.model";
import { Template } from "../../../models/Template.model";

import { IScope } from "../../../interfaces/IScope.interface";
import { I_mFor } from "../../../interfaces/I_mFor.interface";

import { MINT_ERROR } from "../../../data/constants.data";

import { TFOR_Type } from "../../../types/TFOR_Type.type";

export const generateMFor = (
  forKey: string,
  forValue: string,
  mintElement: MintElement,
  scope: IScope,
  parentTemplate: null | Template,
  {
    isComponent,
    mForType,
    isSVG,
  }: {
    isComponent: boolean;
    mForType?: TFOR_Type;
    isSVG: boolean;
  } = { isComponent: false, isSVG: false }
): I_mFor => {
  const _forData = (scope as any)[forValue];
  if (!(_forData instanceof Array) || _forData === undefined) {
    throw new Error(`${MINT_ERROR} Must pass in an Array or undefined to mFor`);
  }

  const forData = [..._forData].filter(checkUnique(forKey));

  const currentForRenders = generateForTemplates(
    mintElement,
    parentTemplate,
    scope,
    forData,
    { isComponent, isSVG }
  );

  if (_forData.length !== forData.length) {
    console.warn(
      `mFor -- duplicate elements detected. Only one instance will be rendered. Check mKey value. ${forKey}`
    );
  }

  return {
    forKey,
    forValue,
    mintElement,
    scope,
    forData,
    currentForRenders,
    oldForDataLength: forData.length,
    mForType,
  };
};

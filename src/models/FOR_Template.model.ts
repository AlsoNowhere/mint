import { Template } from "./Template.model";
import { MintElement } from "./MintElement.model";

import { IScope } from "../interfaces/IScope.interface";
import { I_mFor } from "../interfaces/I_mFor.interface";

type TArguments = {
  mintElement: MintElement | string;
  parentTemplate: null | Template;
  scope: IScope;
  isSVG: boolean;
  mFor: I_mFor;
  isComponent: boolean;
};

export class FOR_Template {
  mintElement: MintElement | string;
  parentTemplate: null | Template;
  scope: IScope;
  isSVG: boolean;
  mFor: I_mFor;
  isComponent: boolean;
  constructor({
    mintElement,
    parentTemplate,
    scope,
    isSVG,
    mFor,
    isComponent,
  }: TArguments) {
    this.mintElement = mintElement;
    this.parentTemplate = parentTemplate;
    this.scope = scope;
    this.isSVG = isSVG;
    this.mFor = mFor;
    this.isComponent = isComponent;
  }
}

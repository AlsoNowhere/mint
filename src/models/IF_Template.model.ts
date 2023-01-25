import { Template } from "./Template.model";
import { MintElement } from "./MintElement.model";

import { IScope } from "../interfaces/IScope.interface";
import { I_mIf } from "../interfaces/I_mIf.interface";

type TArguments = {
  mintElement: MintElement | string;
  parentTemplate: null | Template;
  scope: IScope;
  isSVG: boolean;
  mIf: I_mIf;
  isComponent: boolean;
};

export class IF_Template {
  mintElement: MintElement | string;
  parentTemplate: null | Template;
  scope: IScope;
  isSVG: boolean;
  mIf: I_mIf;
  isComponent: boolean;
  constructor({
    mintElement,
    parentTemplate,
    scope,
    isSVG,
    mIf,
    isComponent,
  }: TArguments) {
    this.mintElement = mintElement;
    this.parentTemplate = parentTemplate;
    this.scope = scope;
    this.isSVG = isSVG;
    this.mIf = mIf;
    this.isComponent = isComponent;
  }
}

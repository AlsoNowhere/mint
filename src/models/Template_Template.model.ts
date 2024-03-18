import { Template } from "./Template.model";
import { MintTemplate } from "./MintTemplate.model";

import { IScope } from "../interfaces/IScope.interface";
import { I_mTemplate } from "../interfaces/I_mTemplate.interface";

type TArguments = {
  mintTemplate: MintTemplate;
  parentTemplate: null | Template;
  scope: IScope;
  isSVG: boolean;
};

export class Template_Template {
  mintTemplate: MintTemplate;
  parentTemplate: null | Template;
  scope: IScope;
  isSVG: boolean;
  mTemplate: I_mTemplate;
  isComponent: boolean;
  constructor({ mintTemplate, parentTemplate, scope, isSVG }: TArguments) {
    this.mintTemplate = mintTemplate;
    this.parentTemplate = parentTemplate;
    this.scope = scope;
    this.isSVG = isSVG;
  }
}

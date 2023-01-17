import { MintComponent } from "../../models/MintComponent.model";
import { Template } from "../../models/Template.model";

import { IScope } from "../IScope.interface";
import { I_mFor } from "../I_mFor.interface";
import { I_mIf } from "../I_mIf.interface";

export interface IComponentTemplate {
  component: MintComponent;
  props: Object;
  parentTemplate: Template;
  scope: IScope;
  templates: Array<Template>;
  mIf?: I_mIf;
  mFor?: I_mFor;
  componentElement: HTMLElement | SVGElement;
  attributes: Object;
}

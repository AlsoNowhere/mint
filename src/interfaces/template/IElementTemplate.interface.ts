import { Template } from "../../models/Template.model";

import { IScope } from "../IScope.interface";
import { I_mFor } from "../I_mFor.interface";
import { I_mIf } from "../I_mIf.interface";
import { I_mRef } from "../I_mRef.interface";

export interface IElementTemplate {
  element: SVGElement | HTMLElement;
  attributes: Object;
  parentTemplate: Template;
  scope: IScope;
  templates: Array<Template>;
  mIf?: I_mIf;
  mFor?: I_mFor;
  mRef?: I_mRef;
}

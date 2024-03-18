import { refreshAttributes } from "./attributes/refreshAttributes.logic";

import { Template } from "../../models/Template.model";
import { IF_Template } from "../../models/IF_Template.model";

import { IElementTemplate } from "../../interfaces/template/IElementTemplate.interface";

export const refreshElementTemplate = (
  template: Template | IF_Template,
  { inserted }: { inserted: boolean }
) => {
  /* Dev */
  // console.log("DEV === REFRESH === ELEMENT: ", template);

  const _template = template as IElementTemplate;

  refreshAttributes(_template.element, _template.attributes, _template.scope);
};

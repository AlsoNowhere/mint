import { refreshAttributes } from "./attributes/refreshAttributes.logic";
import { refreshTemplate } from "./refreshTemplate.logic";

import { Template } from "../../models/Template.model";
import { IF_Template } from "../../models/IF_Template.model";

import { IElementTemplate } from "../../interfaces/template/IElementTemplate.interface";

export const refreshElementTemplate = (template: Template | IF_Template) => {
  /* Dev */
  // console.log("DEV === REFRESH === ELEMENT: ", template);

  const _template = template as IElementTemplate;

  refreshAttributes(_template.element, _template.attributes, _template.scope);

  _template.templates.forEach((x, i) =>
    refreshTemplate(
      (x.parentTemplate?.componentElement || x.parentTemplate?.element) as
        | HTMLElement
        | SVGElement,
      x,
      _template.templates,
      i
    )
  );
};

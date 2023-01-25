import { refreshAttributes } from "./attributes/refreshAttributes.logic";
import { refreshTemplate } from "./refreshTemplate.logic";

import { IF_Template } from "../../models/IF_Template.model";
import { Template } from "../../models/Template.model";

import { IComponentTemplate } from "../../interfaces/template/IComponentTemplate.interface";
import { refreshProps } from "./component/refreshProps.logic";

export const refreshComponentTemplate = (template: Template | IF_Template) => {
  /* Dev */
  // console.log("DEV === REFRESH === COMPONENT: ", template);

  const _template = template as IComponentTemplate;

  refreshProps(
    _template.scope,
    _template.props,
    _template.parentTemplate.scope
  );

  template.scope.oneach?.();

  refreshAttributes(
    _template.componentElement,
    _template.attributes,
    _template.scope
  );

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

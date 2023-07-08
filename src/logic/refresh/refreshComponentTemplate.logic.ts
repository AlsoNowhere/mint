import { refreshAttributes } from "./attributes/refreshAttributes.logic";
import { refreshTemplate } from "./refreshTemplate.logic";
import { refreshProps } from "./component/refreshProps.logic";

import { IF_Template } from "../../models/IF_Template.model";
import { Template } from "../../models/Template.model";

import { IComponentTemplate } from "../../interfaces/template/IComponentTemplate.interface";

export const refreshComponentTemplate = (
  template: Template | IF_Template,
  { inserted }: { inserted: boolean }
) => {
  /* Dev */
  // console.log("DEV === REFRESH === COMPONENT: ", template);

  const _template = template as IComponentTemplate;

  _template.parentTemplate &&
    refreshProps(
      _template.scope,
      _template.props,
      _template.parentTemplate.scope
    );

  template.scope.oneach?.();
  inserted && template.scope.oninsert?.();

  refreshAttributes(
    _template.componentElement,
    _template.attributes,
    _template.scope
  );

  // _template.templates.forEach((x, i) =>
  //   refreshTemplate(
  //     (x.parentTemplate?.componentElement || x.parentTemplate?.element) as
  //       | HTMLElement
  //       | SVGElement,
  //     x,
  //     _template.templates,
  //     i,
  //     { inserted }
  //   )
  // );
};

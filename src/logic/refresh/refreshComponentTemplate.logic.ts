import { refreshAttributes } from "./attributes/refreshAttributes.logic";
import { assignProps } from "../common/assign-props.logic";

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
    assignProps(
      _template.scope,
      _template.props,
      _template.parentTemplate.scope,
      "refresh"
    );

  template.scope.oneach?.();
  inserted && template.scope.oninsert?.();

  refreshAttributes(
    _template.componentElement,
    _template.attributes,
    _template.scope
  );
};

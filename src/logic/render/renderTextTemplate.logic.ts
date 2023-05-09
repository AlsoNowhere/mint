import { deBracer } from "../../services/deBracer.service";

import { Template } from "../../models/Template.model";

import { IText } from "../../interfaces/IText.interface";

export const renderTextTemplate = (
  template: Template,
  rootElement: HTMLElement | SVGElement
) => {
  const _template: IText = template as IText;
  rootElement.appendChild(_template.textNode);

  /* Dev */
  // console.log("DEV === RENDER === TEXT NODE: ", _template.textValue, _template.scope);

  _template.textNode.nodeValue = deBracer(
    _template.textValue,
    _template.scope,
    "Render - textNode"
  );
};

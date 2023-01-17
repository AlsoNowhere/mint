import { deBracer } from "../../services/deBracer.service";

import { Template } from "../../models/Template.model";

import { IText } from "../../interfaces/IText.interface";

export const refreshTextNode = (template: Template) => {
  const _template: IText = template as IText;

  /* Dev */
  // console.log("DEV === REFRESH === TEXT NODE: ", _template.textValue, _template.scope);

  _template.textNode.nodeValue = deBracer(_template.textValue, _template.scope);
};

import { Template } from "../../models/Template.model";

import { IScope } from "../../interfaces/IScope.interface";

export const generateTextTemplate = (
  mintElement: string,
  parentTemplate: null | Template,
  rootScope: IScope
) => {
  const textNode = document.createTextNode("");
  return new Template({
    element: textNode,
    textValue: mintElement,
    scope: rootScope,
    parentTemplate,
    mintElement,
  });
};

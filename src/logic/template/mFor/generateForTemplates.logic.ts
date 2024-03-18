import { createForData } from "../../../services/createForData.service";

import { generateTemplate } from "../generateTemplate.logic";

import { MintElement } from "../../../models/MintElement.model";
import { Template } from "../../../models/Template.model";
import { Base } from "../../../models/Base.model";

import { IScope } from "../../../interfaces/IScope.interface";

type XType = Template | Object | string | number;

export const generateForTemplates = (
  mintElement: MintElement,
  parentTemplate: null | Template,
  parentScope: IScope,
  forData: Array<Template | Object | string | number>,
  {
    isComponent = false,
    isSVG = false,
  }: {
    isComponent: boolean;
    isSVG: boolean;
  }
): Array<Template> => {
  const component =
    mintElement.component instanceof Function
      ? mintElement.component()
      : mintElement.component;

  const list: Array<Template> = forData.map((x: XType, index: number) => {
    if (x instanceof Template) return x;

    const newScope = !isComponent
      ? parentScope || new Base()
      : new (component.scope ?? Base)();

    const scope = createForData(x, newScope, index);

    const mintElementClone = mintElement.clone();

    const template = generateTemplate(mintElementClone, parentTemplate, scope, {
      isSVG,
      isMFor: true,
    }) as Template;

    return template;
  });

  return list;
};

import { Template } from "../models/Template.model";
import { IF_Template } from "../models/IF_Template.model";
import { FOR_Template } from "../models/FOR_Template.model";

export const getWhereToInsert = (
  templates: Array<Template | IF_Template | FOR_Template>,
  rootElement: Element,
  templateIndex: number
): Element | undefined => {
  let i = templateIndex + 1;
  while (i < templates.length) {
    const template = templates[i++];
    if (!(template instanceof Template)) continue;
    if (template.mFor !== undefined) {
      let j = 0;
      while (j < template.mFor.currentForRenders.length) {
        const forTemplate = template.mFor.currentForRenders[j++];
        const element = forTemplate.componentElement || forTemplate.element;
        if (element !== undefined && rootElement.contains(element)) {
          return element;
        }
      }
      continue;
    }
    const element = template.componentElement || template.element;
    if (element !== undefined && rootElement.contains(element)) {
      return element;
    }
  }
};

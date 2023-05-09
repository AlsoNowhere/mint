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
    if (template instanceof IF_Template) continue;
    const { mFor } = template;
    if (mFor !== undefined) {
      let j = 0;
      while (j < mFor.currentForRenders.length) {
        const forTemplate = mFor.currentForRenders[j++];
        const element = forTemplate.componentElement || forTemplate.element;
        if (element !== undefined && rootElement.contains(element)) {
          return element;
        }
      }
      continue;
    }
    if (template instanceof Template) {
      const element = template.componentElement || template.element;
      if (element !== undefined && rootElement.contains(element)) {
        return element;
      }
    }
  }
};

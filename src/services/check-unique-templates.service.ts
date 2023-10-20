import { Template } from "../models/Template.model";

export const checkUniqueTemplates = (templates: Array<Template>) => {
  const arr: Array<Template> = [];
  for (let template of templates) {
    if (arr.includes(template)) return false;
    arr.push(template);
  }
  return true;
};

import { Template } from "../models/Template.model";

const getContent = (template: Template): Array<Template> | undefined => {
  const { content } = template;
  if (content !== undefined && content !== null) return content;
  if (template.parentTemplate === null) return;
  return getContent(template.parentTemplate);
};

export const resolveChildren = (
  template: Template,
  templates: Array<Template | "_children">
): Array<Template> => {
  const content = getContent(template);
  if (content === undefined)
    return templates.filter((x) => x !== "_children") as Array<Template>;
  const output: Array<Template> = [];
  templates.forEach((x) => {
    if (x === "_children") {
      output.push(...content);
    } else output.push(x);
  });
  return output;
};

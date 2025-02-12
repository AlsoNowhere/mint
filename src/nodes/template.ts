import { MintTemplate } from "../models/mint-nodes/MintTemplate.model";

import { ITemplateOptions } from "../interfaces/ITemplateOptions.interface";
import { IScope } from "../interfaces/IScope.interface";
import { INode } from "../interfaces/INode.interface";

export const template = (
  optionsOrGenerator:
    | ITemplateOptions
    | ((scope: IScope) => INode | Array<INode>)
    | string,
  templateGenerator?: ((scope: IScope) => INode | Array<INode>) | string
) => {
  return new MintTemplate(optionsOrGenerator, templateGenerator);
};

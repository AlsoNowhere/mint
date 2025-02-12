import { generateMTemplate } from "../../logic/mTemplate/generate-m-template.logic";
import { renderMTemplate } from "../../logic/mTemplate/render-m-template.logic";
import { refreshMTemplate } from "../../logic/mTemplate/refresh-m-template.logic";

import { MintNode } from "./MintNode.model";

import { ITemplateOptions } from "../../interfaces/ITemplateOptions.interface";
import { IScope } from "../../interfaces/IScope.interface";
import { INode } from "../../interfaces/INode.interface";

export class MintTemplate extends MintNode {
  options: ITemplateOptions;
  templateGenerator: (scope: IScope) => INode | Array<INode>;
  scopeLookup?: string;

  constructor(
    optionsOrGeneratorOrScopeLookup:
      | ITemplateOptions
      | ((scope: IScope) => INode | Array<INode>)
      | string,
    templateGeneratorOrScopeLookup?:
      | ((scope: IScope) => INode | Array<INode>)
      | string
  ) {
    super(null, generateMTemplate, renderMTemplate, refreshMTemplate);
    if (templateGeneratorOrScopeLookup !== undefined) {
      this.options = optionsOrGeneratorOrScopeLookup as ITemplateOptions;

      if (typeof templateGeneratorOrScopeLookup === "string") {
        this.scopeLookup = templateGeneratorOrScopeLookup;
      } else {
        this.templateGenerator = templateGeneratorOrScopeLookup;
      }
    } else {
      this.options = {
        onevery: true,
      };

      if (typeof optionsOrGeneratorOrScopeLookup === "string") {
        this.scopeLookup = optionsOrGeneratorOrScopeLookup;
      } else {
        this.templateGenerator = optionsOrGeneratorOrScopeLookup as () =>
          | INode
          | Array<INode>;
      }
    }
  }

  addChildren() {}
  addProperties() {}
}

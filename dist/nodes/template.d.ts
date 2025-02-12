import { MintTemplate } from "../models/mint-nodes/MintTemplate.model";
import { ITemplateOptions } from "../interfaces/ITemplateOptions.interface";
import { IScope } from "../interfaces/IScope.interface";
import { INode } from "../interfaces/INode.interface";
export declare const template: (optionsOrGenerator: string | ITemplateOptions | ((scope: IScope) => INode | Array<INode>), templateGenerator?: string | ((scope: IScope) => INode | Array<INode>) | undefined) => MintTemplate;

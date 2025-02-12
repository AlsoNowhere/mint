import { MintNode } from "./MintNode.model";
import { ITemplateOptions } from "../../interfaces/ITemplateOptions.interface";
import { IScope } from "../../interfaces/IScope.interface";
import { INode } from "../../interfaces/INode.interface";
export declare class MintTemplate extends MintNode {
    options: ITemplateOptions;
    templateGenerator: (scope: IScope) => INode | Array<INode>;
    scopeLookup?: string;
    constructor(optionsOrGeneratorOrScopeLookup: ITemplateOptions | ((scope: IScope) => INode | Array<INode>) | string, templateGeneratorOrScopeLookup?: ((scope: IScope) => INode | Array<INode>) | string);
    addChildren(): void;
    addProperties(): void;
}

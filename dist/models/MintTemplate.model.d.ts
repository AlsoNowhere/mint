import { MintNode } from "./MintNode.model";
import { ITemplateOptions } from "../interfaces/ITemplateOptions.interface";
import { IScope } from "../interfaces/IScope.interface";
import { TMintContent } from "../types/TMintContent.type";
export declare class MintTemplate extends MintNode {
    options: ITemplateOptions;
    templateGenerator: (scope: IScope) => TMintContent | Array<TMintContent>;
    scopeLookup?: string;
    constructor(optionsOrGeneratorOrScopeLookup: ITemplateOptions | ((scope: IScope) => TMintContent | Array<TMintContent>) | string, templateGeneratorOrScopeLookup?: ((scope: IScope) => TMintContent | Array<TMintContent>) | string);
}

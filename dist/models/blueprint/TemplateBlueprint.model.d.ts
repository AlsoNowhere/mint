import { MintTemplate } from "../mint-nodes/MintTemplate.model";
import { Blueprint } from "./Blueprint.model";
import { IMainScope } from "../../interfaces/IMainScope.interface";
import { IRootScope } from "../../interfaces/IRootScope.interface";
import { TParentBlueprint } from "../../types/TParentBlueprint.type";
type TAttributes = {
    mintNode: MintTemplate;
    fragment?: true;
    templateState: null | string | number | boolean | Object;
    scope: IMainScope;
    parentBlueprint: null | TParentBlueprint;
    _rootScope: IRootScope;
};
export declare class TemplateBlueprint extends Blueprint {
    fragment?: true;
    templateState: null | string | number | boolean | Object;
    collection: Array<Blueprint>;
    childBlueprints: undefined;
    _dev: "Template";
    constructor({ mintNode, fragment, templateState, scope, parentBlueprint, _rootScope, }: TAttributes);
}
export {};

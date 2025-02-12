import { MintTemplate } from "./MintTemplate.model";
import { Blueprint } from "./Blueprint.model";
import { IScope } from "../interfaces/IScope.interface";
import { IRootScope } from "../interfaces/IRootScope.interface";
import { TBlueprint } from "../types/TBlueprint.type";
type TArguments = {
    mintElement: MintTemplate;
    parentBlueprint: null | Blueprint;
    scope: IScope;
    rootScope: IRootScope;
};
export declare class TEMPLATE_Blueprint {
    mintElement: MintTemplate;
    parentBlueprint: null | Blueprint;
    scope: IScope;
    rootScope: IRootScope;
    templateState: any;
    templateBlueprints: Array<TBlueprint>;
    constructor({ mintElement, parentBlueprint, scope, rootScope }: TArguments);
}
export {};

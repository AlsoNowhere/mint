import { Blueprint } from "../models/Blueprint.model";
import { MintComponent } from "../models/MintComponent.model";
import { IScope } from "./IScope.interface";
import { TElement } from "../types/TElement.type";
export interface IComponentBlueprint {
    component: MintComponent;
    props: Object;
    parentBlueprint: Blueprint;
    scope: IScope;
    childBlueprints: Array<Blueprint>;
    componentElement: TElement;
    attributes: Object;
}

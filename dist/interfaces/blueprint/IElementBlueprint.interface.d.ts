import { Blueprint } from "../../models/Blueprint.model";
import { IScope } from "../IScope.interface";
export interface IElementBlueprint {
    element: SVGElement | HTMLElement;
    attributes: Object;
    parentBlueprint: Blueprint;
    scope: IScope;
    childBlueprints: Array<Blueprint>;
}

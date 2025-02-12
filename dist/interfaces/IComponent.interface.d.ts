import { MintComponent } from "../models/MintComponent.model";
import { IConstructorScope } from "./IConstructorScope.interface";
import { IElement } from "./IElement.interface";
import { TMintContent } from "../types/TMintContent.type";
export interface IComponent {
    mintElement: IElement;
    component: MintComponent;
    props: Object;
    content: Array<TMintContent>;
    scope: null | IConstructorScope;
}

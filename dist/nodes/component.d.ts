import { MintComponent } from "../models/mint-nodes/MintComponent.model";
import { IConstructorScope } from "../interfaces/IConstructorScope.interface";
import { IAttributes } from "../interfaces/IAttributes.interface";
import { TRawContent } from "../types/TRawContent.type";
export declare const component: (element: string, scope?: null | IConstructorScope, attributes?: null | IAttributes, initialContent?: null | TRawContent) => MintComponent;

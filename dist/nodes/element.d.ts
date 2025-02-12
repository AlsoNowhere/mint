import { MintComponent } from "../models/MintComponent.model";
import { MintElement } from "../models/MintElement.model";
import { MintTemplate } from "../models/MintTemplate.model";
import { IProperties } from "../interfaces/IProperties.interface";
import { TRawContent } from "../types/TRawContent.type";
export declare const element: <T>(element: string | MintComponent | MintTemplate, properties?: (T & IProperties) | null, initialContent?: null | TRawContent) => MintElement;

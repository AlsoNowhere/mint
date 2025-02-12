import { MintNode } from "./MintNode.model";
import { MintComponent } from "./MintComponent.model";
import { MintTemplate } from "./MintTemplate.model";
import { IProperties } from "../interfaces/IProperties.interface";
import { TRawContent } from "../types/TRawContent.type";
import { TMintContent } from "../types/TMintContent.type";
export declare class MintElement extends MintNode {
    element: string | MintComponent | MintTemplate;
    properties: IProperties;
    constructor(element: string | MintComponent | MintTemplate, properties?: null | IProperties, initialContent?: null | TRawContent | TMintContent | Array<TMintContent>);
    private cloneAttributes;
    clone(): MintElement;
}

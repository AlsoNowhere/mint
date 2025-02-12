import { MintComponent } from "./mint-nodes/MintComponent.model";
import { MintElement } from "./mint-nodes/MintElement.model";
import { MintTemplate } from "./mint-nodes/MintTemplate.model";
import { MintText } from "./mint-nodes/MintText.model";
import { INode } from "../interfaces/INode.interface";
import { IProps } from "../interfaces/IProps.interface";
export declare class CreateNode<T = {}> implements INode<T> {
    mintNode: MintText | MintElement | MintComponent | MintTemplate;
    props: null | (T & IProps);
    content: null | Array<INode>;
    constructor(mintNode: MintText | MintElement | MintComponent | MintTemplate, props?: null | (T & IProps), content?: null | Array<INode>);
}

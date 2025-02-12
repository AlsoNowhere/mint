import { INode } from "./INode.interface";
import { IProps } from "./IProps.interface";

export interface IElement {
  element: string;
  props: IProps;
  content?: Array<INode>;
}

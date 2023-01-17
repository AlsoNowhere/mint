import { MintElement } from "../../models/MintElement.model";

export interface IElement {
  element: string;
  attributes: Object;
  content: Array<MintElement | string>;
}

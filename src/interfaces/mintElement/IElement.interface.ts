import { TMintContent } from "../../types/TMintContent.type";

export interface IElement {
  element: string;
  attributes: Object;
  content?: Array<TMintContent>;
}

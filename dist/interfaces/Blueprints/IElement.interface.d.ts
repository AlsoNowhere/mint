import { IProps } from "../IProps.interface";
import { IAttributes } from "../IAttributes.interface";
import { TMintContent } from "../../types/TMintContent.type";
export interface IElement {
    element: string;
    attributes: IProps | IAttributes;
    content?: Array<TMintContent>;
}

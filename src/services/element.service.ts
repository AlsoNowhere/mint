import { MintComponent } from "../models/MintComponent.model";
import { MintElement } from "../models/MintElement.model";

import { IProps } from "../interfaces/IProps.interface";

import { TMintContent } from "../types/TMintContent.type";

export const element = <T extends Object & IProps>(
  element: string | MintComponent,
  attributesOrProps?: null | (T & IProps),
  content: null | TMintContent | Array<TMintContent> = []
) => {
  return new MintElement(element, attributesOrProps, content);
};

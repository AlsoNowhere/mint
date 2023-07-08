import { MintComponent } from "../models/MintComponent.model";
import { MintElement } from "../models/MintElement.model";

import { TMintContent } from "../types/TMintContent.type";

export const element = <T extends Object = {}>(
  element: string | MintComponent,
  attributesOrProps?: null | T,
  content: null | TMintContent | Array<TMintContent> = []
) => {
  return new MintElement(element, attributesOrProps, content);
};

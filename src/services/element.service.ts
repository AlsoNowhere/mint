import { MintComponent } from "../models/MintComponent.model";
import { MintElement } from "../models/MintElement.model";

export const element = <T extends Object = {}>(
  // element: string | MintComponent | (() => MintComponent),
  element: string | MintComponent,
  attributesOrProps?: null | T,
  content: null | MintElement | string | Array<MintElement | string> = []
) => {
  return new MintElement(element, attributesOrProps, content);
};

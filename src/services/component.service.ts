import { MintComponent } from "../models/MintComponent.model";
import { MintElement } from "../models/MintElement.model";

import { IConstructorScope } from "../interfaces/IConstructorScope.interface";

export const component = (
  element: string,
  scope: null | IConstructorScope,
  attributes: null | Object = {},
  content: null | MintElement | string | Array<MintElement | string> = []
) => {
  return new MintComponent(
    new MintElement(element, attributes, content),
    scope
  );
};

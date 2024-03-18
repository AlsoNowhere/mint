import { Store } from "../store/Store";

import { MintComponent } from "../models/MintComponent.model";
import { MintElement } from "../models/MintElement.model";
import { Base } from "../models/Base.model";

import { IConstructorScope } from "../interfaces/IConstructorScope.interface";
import { IStore } from "../interfaces/IStore.interface";

import { TMintContent } from "../types/TMintContent.type";

export const component = (
  element: string,
  scope: null | IConstructorScope | IStore,
  attributes: null | Object = {},
  content: null | TMintContent | Array<TMintContent> = []
) => {
  if (scope instanceof Store) {
    const _scope = scope;
    class Scope extends Base {
      constructor() {
        super();

        _scope.connect(this);
      }
    }
    scope = Scope;
  }

  return new MintComponent(
    new MintElement(element, attributes, content),
    scope as null | IConstructorScope
  );
};

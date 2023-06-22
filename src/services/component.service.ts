import { Store } from "../store/Store";

import { MintComponent } from "../models/MintComponent.model";
import { MintElement } from "../models/MintElement.model";
import { Base } from "../models/Base.model";

import { settings } from "../data/variables.data";

import { IConstructorScope } from "../interfaces/IConstructorScope.interface";
import { IStore } from "../interfaces/IStore.interface";

export const component = (
  element: string,
  scope: null | IConstructorScope | IStore,
  attributes: null | Object = {},
  content: null | MintElement | string | Array<MintElement | string> = []
) => {
  if (settings.crispMode && scope !== null) {
    if (!(scope instanceof Store)) {
      throw new Error("In Mint crisp mode, Component must have store or null.");
    }
    const _scope = scope;
    class Scope extends Base {
      constructor() {
        super();

        _scope.connect(this);
      }
    }
    scope = Scope;
  }
  if (
    settings.crispMode &&
    scope === null &&
    !Object.prototype.hasOwnProperty.apply(attributes, ["_store"])
  ) {
    throw new Error(
      "When in Mint crisp mode, if passing null for Store, you must provide a prop for the parent store."
    );
  }
  return new MintComponent(
    new MintElement(element, attributes, content),
    scope as null | IConstructorScope
  );
};

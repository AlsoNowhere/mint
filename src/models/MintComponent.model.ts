import { MintElement } from "./MintElement.model";

import { IConstructorScope } from "../interfaces/IConstructorScope.interface";

export class MintComponent {
  mintElement: MintElement;
  scope: null | IConstructorScope;
  constructor(mintElement: MintElement, scope: null | IConstructorScope) {
    this.mintElement = mintElement;
    this.scope = scope;
  }
}

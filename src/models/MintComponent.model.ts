import { MintElement } from "./MintElement.model";

import { IConstructorScope } from "../interfaces/IConstructorScope.interface";

export class MintComponent {
  mintElement: MintElement;
  scope: null | IConstructorScope;
  propTypes?: Record<string, string>;

  constructor(mintElement: MintElement, scope: null | IConstructorScope) {
    this.mintElement = mintElement;
    this.scope = scope;

    if (scope?.propTypes) {
      this.propTypes = scope.propTypes;
    }
  }
}

import { ScopeTransformer } from "./ScopeTransformer.model";
import { ComponentBlueprint } from "../blueprint/ComponentBlueprint.model";

import { IScope } from "../../interfaces/IScope.interface";

const getContexts = (blueprint: ComponentBlueprint | undefined, target: string) => {
  if (blueprint === undefined) return undefined;

  if (blueprint.contexts) {
    if (blueprint.contexts[target]) {
      return blueprint.contexts[target];
    }
  }
  if (blueprint.parentBlueprint === null) return undefined;
  return getContexts(blueprint.parentBlueprint as ComponentBlueprint, target);
};

export class GetContext extends ScopeTransformer {
  target: string;

  constructor(target: string) {
    super((scope: IScope, key) => {
      Object.defineProperty(scope, key, {
        get: () => {
          const value = getContexts(scope._mintBlueprint as ComponentBlueprint, target);
          return value;
        }
      });
    });

    this.target = target;
  }
}

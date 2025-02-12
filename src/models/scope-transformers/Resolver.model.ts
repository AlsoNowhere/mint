import { ScopeTransformer } from "./ScopeTransformer.model";

const _get = <T = any>(target: any, value: string): T => {
  let output = target;
  const trail = value.split(".");
  while (trail.length > 0) {
    const [property] = trail;
    output = (output as any)[property];
    trail.shift();
  }
  return output;
};

export class Resolver<T = any> extends ScopeTransformer {
  callback: () => T;
  constructor(callback: string | (() => T)) {
    super((scope, key) => {
      Object.defineProperty(scope, key, {
        get: this.callback,
      });
    });
    if (callback instanceof Function) {
      this.callback = callback;
    } else {
      this.callback = function () {
        return _get(this, callback);
      };
    }
  }
}

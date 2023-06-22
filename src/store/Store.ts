import { IScope } from "../interfaces/IScope.interface";
import { IStore } from "../interfaces/IStore.interface";

export class Resolver<T = any> {
  callback: () => T;
  constructor(callback: () => T) {
    this.callback = callback;
  }
}

export class Store implements IStore {
  _component: IScope | null;
  _keys: Array<string>;

  constructor(initialData: Object) {
    if (!(initialData instanceof Object)) {
      throw "You must provide an Object to create a new Store.";
    }

    Object.entries(initialData).forEach(([key, value]) => {
      if (value instanceof Resolver) {
        Object.defineProperty(this, key, {
          get: (value as Resolver).callback,
        });
      } else {
        (this as any)[key] = value;
      }
    });

    this._component = null;
    this._keys = Object.keys(initialData);

    Object.seal(this);
  }

  connect(scope: IScope) {
    this._component = scope;
    scope._store = this;

    {
      let i = 0;
      while (i < this._keys.length) {
        const property = this._keys[i++];
        let _value = (this as any)[property];
        Object.defineProperty(scope, property, {
          get: () => (this as any)[property],
          set: (value) => {
            _value = value;
            (this as any)[property] = value;
          },
        });
      }
    }
  }
}

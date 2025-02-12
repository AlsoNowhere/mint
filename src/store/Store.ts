import { ScopeTransformer } from "../models/scope-transformers/ScopeTransformer.model";

import { IScope } from "../interfaces/IScope.interface";
import { IStore } from "../interfaces/IStore.interface";

export abstract class Store implements IStore {
  _component: IScope | null;

  private _keys: Array<string>;
  private _data: any;

  constructor(initialData: Record<string, any> & IScope) {
    if (!(initialData instanceof Object)) {
      throw "You must provide an Object to create a new Store.";
    }

    const entries = Object.entries(initialData);
    for (let [key, value] of entries) {
      if (value instanceof ScopeTransformer) {
        value.transform(this, key);
      } else {
        this[key] = value;
      }
    }

    this._component = null;
    this._keys = Object.keys(initialData);
    this._data = initialData;

    Object.seal(this);
  }

  connect(scope: IScope) {
    this._component = scope;
    scope._store = this;

    for (let key of this._keys) {
      const value = this._data[key];
      if (value instanceof ScopeTransformer) {
        value.transform(scope, key);
      } else {
        Object.defineProperty(scope, key, {
          get: () => this[key],
          set: (_value) => (this[key] = _value),
        });
      }
    }
  }
}


export const Store = function(
    initialData
){
    Object.entries(initialData).forEach(([key, data]) => {
        if (data instanceof Function) {
            Object.defineProperty(this, key, {
                get: data
            });
        }
        else {
            this[key] = data;
        }
    });

    this._component = null;
    this._keys = Object.keys(initialData);

    Object.seal(this);
}
Store.prototype = {
    connect(scope) {
        this._component = scope;

        let i = 0;
        while (i < this._keys.length) {
            const property = this._keys[i++];
            scope[property] = this[property];
            Object.defineProperty(scope, property, {
                get: () => this[property],
                set: value => {
                    scope[property] = value;
                    this[property] = value;
                }
            });
        }
    }
}

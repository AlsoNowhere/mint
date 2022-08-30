
import { element } from "../elements/element";

export const generatemForData = (scope, _x, _i) => {
    const Data = function(){
        this._i = _i;
    }

    Data.prototype = scope;

    const newScope = new Data();

    _x instanceof Object
        ? Object.assign(newScope, _x)
        : (newScope._x = _x);

    return newScope;
}

export const resolveFor = (
    { nodeName, attributes },
    scope,
    forValue,
    content
) => {
    const list = scope[forValue];
    const elements = [];
    const scopes = [];

    list.forEach((_x, _i) => {
        elements.push(element(nodeName, { ...attributes }, content));

        const newScope = generatemForData(scope, _x, _i);

        scopes.push(newScope);
    });

    return {
        elements,
        scopes
    }
}

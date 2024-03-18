import { IForData } from "../interfaces/IForData.interface";

/*
  This is a very important Function.
  When passing an Array of Objects to a mFor we need to go over the data of each
  Object and add the parent scope into the data.
  We do this by creating a new Object and adding the parent scope as the prototype.
  Importantly we then define the for each data using Object.defineProperty
  instead of newScope.property = value otherwise the parent would change instead,
  leaving the parent scope with the last Array property value and with each in the for
  using that property too.
*/
export const createForData = (
  data: Object | string | number,
  scope: Object,
  index: number
): IForData => {
  const Data: any = function _ForData() {
    this._parent = scope;
    this._x = data;
    this._i = index;
    this.__name = "_ForData";
  };
  Data.prototype = scope;

  const newScope: IForData = new Data();

  if (data instanceof Object) {
    Object.entries(data).forEach(([key, value]) => {
      Object.defineProperty(newScope, key, {
        // ** Set the value
        value,
        // ** Can it be edited
        writable: true,
        // ** Will it be loopable e.g is shown in Object.entries
        enumerable: true,
        // ** Can it be deleted from this object
        configurable: true,
      });
    });
  }
  return newScope;
};

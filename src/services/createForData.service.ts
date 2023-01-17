import { IForData } from "../interfaces/IForData.interface";

export const createForData = (
  data: Object | string | number,
  scope: Object,
  index: number
): IForData => {
  const Data: any = function _ForData() {
    this._i = index;
    this.__name = "_ForData";
  };
  Data.prototype = scope;
  const newScope = new Data();
  data instanceof Object ? Object.assign(newScope, data) : (newScope._x = data);
  return newScope;
};

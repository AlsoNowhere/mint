import { Store } from "../store/Store";

import { Template } from "./Template.model";

import { IScope } from "../interfaces/IScope.interface";

export class Base implements IScope {
  _store?: Store;
  onpretemplate?: Function;
  oninit?: Function;
  oninsert?: Function;
  oneach?: Function;
  onafterinsert?: Function;
  _component?: IScope | null;
  _mintTemplate?: Template;
  constructor() {}
}

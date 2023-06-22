import { Store } from "../store/Store";

import { Template } from "../models/Template.model";

export interface IScope {
  _store?: Store;
  oninit?: Function;
  oninsert?: Function;
  oneach?: Function;
  onafterinsert?: Function;
  _component?: IScope | null;
  _mintTemplate?: Template;
}

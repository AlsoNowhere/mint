import { Template } from "../models/Template.model";
import { Store } from "../store/Store";

export interface IScope {
  _store?: Store;
  oninit?: Function;
  oninsert?: Function;
  oneach?: Function;
  onafterinsert?: Function;
  _component?: IScope | null;
  _mintTemplate?: Template;
}

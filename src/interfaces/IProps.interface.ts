import { IStore } from "./IStore.interface";

export interface IProps {
  mRef?: string;
  mIf?: string;
  mFor?: string;
  mKey?: string;
  "[scope]"?: string;
  _store?: IStore;
  "[_store]"?: string;
  ref?: string;
}

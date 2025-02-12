import { MintExtend } from "../models/mint-attributes/MintExtend.model";
import { MintRef } from "../models/mint-attributes/MintRef.model";
import { MintIf } from "../models/mint-attributes/MintIf.model";
import { MintFor } from "../models/mint-attributes/MintFor.model";

import { IAttributes } from "./IAttributes.interface";

import { FOR_Type } from "../enum/FOR_Type.enum";

export interface IProps extends IAttributes {
  mExtend?: MintExtend | { mExtend: MintExtend };
  mIf?: MintIf | { mIf: MintIf };
  mFor?: MintFor | { mFor: MintFor };
  mKey?: string;
  mForType?: FOR_Type;
  mRef?: MintRef | { mRef: MintRef };
  "[scope]"?: string;
  "[_store]"?: string;
}

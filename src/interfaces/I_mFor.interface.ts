import { MintElement } from "../models/MintElement.model";
import { Template } from "../models/Template.model";

import { IForData } from "./IForData.interface";
import { IScope } from "./IScope.interface";

import { TFOR_Type } from "../types/TFOR_Type.type";

export interface I_mFor {
  forKey: string;
  forValue: string;
  mintElement: MintElement;
  scope: IScope;
  forData?: Array<IForData | string | number>;
  currentForRenders: Array<Template>;
  oldForDataLength: null | number;
  mForType?: TFOR_Type;
}

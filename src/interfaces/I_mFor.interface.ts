import { MintElement } from "../models/mint-nodes/MintElement.model";
import { MintComponent } from "../models/mint-nodes/MintComponent.model";
import { ElementBlueprint } from "../models/blueprint/ElementBlueprint.model";
import { ComponentBlueprint } from "../models/blueprint/ComponentBlueprint.model";

import { IForData } from "./IForData.interface";
import { IMainScope } from "./IMainScope.interface";

import { FOR_Type } from "../enum/FOR_Type.enum";

export interface I_mFor {
  forKey: string;
  forValue: string;
  mintNode: MintElement | MintComponent;
  scope: IMainScope;
  forData?: Array<IForData | string | number>;
  currentForRenders: Array<ElementBlueprint | ComponentBlueprint>;
  oldForDataLength: null | number;
  mForType?: FOR_Type;
}

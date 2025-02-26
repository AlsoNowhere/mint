import { generateMFor } from "../../logic/mFor/generate-mFor.logic";
import { renderFor } from "../../logic/mFor/render-mFor.logic";
import { refreshMFor } from "../../logic/mFor/refresh-mFor.logic";

import { MintAttribute } from "./MintAttribute.model";
import { ForBlueprint } from "../blueprint/ForBlueprint.model";

import { I_mFor } from "../../interfaces/I_mFor.interface";

import { _DevLogger_ } from "../../_DEV_/_DevLogger_";

export class MintFor extends MintAttribute {
  _mFor: I_mFor;
  generated: boolean;
  blueprint: ForBlueprint;

  constructor(forValue: string) {
    super((oldInstance: MintFor) => {
      const newInstance = new MintFor(forValue);
      newInstance._mFor = oldInstance._mFor;
      newInstance.generated = oldInstance.generated;
      newInstance.blueprint = oldInstance.blueprint;

      return newInstance;
    });

    this.generated = false;

    this.onGenerate = function ({ ...args }) {
      const that = this as MintFor;
      return generateMFor({
        mForInstance: that,
        forValue,
        ...args,
      });
    };

    this.onRender = function (
      blueprint: ForBlueprint,
      parentElement,
      parentChildBlueprints,
      blueprintIndex
    ) {
      /* DEV */
      // _DevLogger_("RENDER", "FOR", blueprint, this);

      const that = this as MintFor;

      if (that.blueprint !== blueprint) {
        throw new Error("This is an unexpected error");
      }

      return renderFor(
        that.blueprint,
        parentChildBlueprints,
        parentElement,
        blueprintIndex
      );
    };

    this.onRefresh = function (_, __, options) {
      const that = this as MintFor;
      refreshMFor(that.blueprint, {
        _mFor: that._mFor,
        ...options,
      });
      return { condition: false };
    };
  }
}

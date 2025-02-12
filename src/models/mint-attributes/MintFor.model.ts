import { generateMFor } from "../../logic/mFor/generate-mFor.logic";
import { renderFor } from "../../logic/mFor/render-mFor.logic";
import { refreshMFor } from "../../logic/mFor/refresh-mFor.logic";

import { MintAttribute } from "./MintAttribute.model";
import { ForBlueprint } from "../blueprint/ForBlueprint.model";

import { I_mFor } from "../../interfaces/I_mFor.interface";

import { _DevLogger_ } from "../../_DEV_/_DevLogger_";

export class MintFor extends MintAttribute {
  _mFor: I_mFor;
  blueprint: ForBlueprint;

  constructor(forValue: string) {
    super(() => new MintFor(forValue));

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
      // _DevLogger_("RENDER", "FOR", blueprint, blueprintIndex);

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

    this.onRefresh = function (
      _,
      __,
      ___,
      blueprintIndex: number,
      { newlyInserted }
    ) {
      const that = this as MintFor;
      return refreshMFor(that.blueprint, blueprintIndex, {
        _mFor: that._mFor,
        newlyInserted,
      });
    };
  }
}

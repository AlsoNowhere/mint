import { generateMIf } from "../../logic/mIf/generate-mIf.logic";
import { refreshMIf } from "../../logic/mIf/refresh-mIf.logic";
import { renderMIf } from "../../logic/mIf/render-mIf.logic";

import { MintAttribute } from "./MintAttribute.model";
import { Blueprint } from "../blueprint/Blueprint.model";
import { IfBlueprint } from "../blueprint/IfBlueprint.model";
import { ElementBlueprint } from "../blueprint/ElementBlueprint.model";
import { ComponentBlueprint } from "../blueprint/ComponentBlueprint.model";

import { I_mIf } from "../../interfaces/I_mIf.interface";

import { _DevLogger_ } from "../../_DEV_/_DevLogger_";

export class MintIf extends MintAttribute {
  _mIf: I_mIf;
  blueprint: Blueprint;

  constructor(ifValue: string) {
    super(() => new MintIf(ifValue));

    this.onGenerate = function ({ ...args }) {
      const that = this as MintIf;
      return generateMIf({
        mIfInstance: that,
        _ifValue: ifValue,
        ...args,
      });
    };

    this.onRender = function (blueprint) {
      const { _mIf } = this as MintIf;
      return renderMIf(blueprint, _mIf);
    };

    this.onRefresh = function (
      blueprint: ElementBlueprint | ComponentBlueprint | IfBlueprint,
      parentElement,
      options
    ) {
      const { _mIf } = this as MintIf;
      return refreshMIf(_mIf, blueprint, parentElement, options);
    };
  }
}

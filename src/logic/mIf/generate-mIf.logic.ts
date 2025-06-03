import { resolvePropertyLookup } from "../../services/resolve-property-lookup.logic";

import { MintElement } from "../../models/mint-nodes/MintElement.model";
import { MintComponent } from "../../models/mint-nodes/MintComponent.model";
import { MintIf } from "../../models/mint-attributes/MintIf.model";
import { IfBlueprint } from "../../models/blueprint/IfBlueprint.model";

import { MINT_WARN } from "../../data/constants.data";

import { TonGenerate } from "../../types/MintAttributes/TonGenerate.type";

import { _DevLogger_ } from "../../_DEV_/_DevLogger_";

export const generateMIf: TonGenerate<{
  mIfInstance: MintIf;
  _ifValue: string;
}> = ({ mIfInstance, _ifValue, node, orderedProps, props, parentScope, parentBlueprint, _rootScope, isSVG }) => {
  const { mintNode, content } = node;
  const mintElement = mintNode as MintElement | MintComponent;

  // <@ REMOVE FOR PRODUCTION
  if (_ifValue.includes(" ")) {
    console.warn(`${MINT_WARN} mIf value defined with a space, this may be a mistake. Value: "${_ifValue}".`);
  }
  // @>

  if (mIfInstance._mIf !== undefined) {
    throw new Error("");
  }

  const inverse = _ifValue.charAt(0) === "!";
  const ifValue = inverse ? _ifValue.substring(1) : _ifValue;

  const result = !!resolvePropertyLookup(ifValue, parentScope);

  const state = inverse ? !result : !!result;

  mIfInstance._mIf = {
    inverse,
    ifValue,
    state,
    scope: parentScope,
    blueprinted: state,
    mintNode: mintNode as MintElement | MintComponent
  };

  /* Dev */
  // _DevLogger_("GENERATE", "mIf", mIfInstance._mIf);

  if (mIfInstance._mIf.state === false) {
    mIfInstance.blueprint = new IfBlueprint({
      mintNode: mintElement,
      orderedProps,
      props: props ?? {},
      scope: parentScope,
      parentBlueprint,
      _rootScope,
      content,
      isSVG
    });

    /* Dev */
    // _DevLogger_("GENERATE", "mIf", that.blueprint, parentBlueprint);

    return { condition: true, value: mIfInstance.blueprint };
  }
  return { condition: false, value: undefined };
};

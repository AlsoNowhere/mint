import { checkUniqueService } from "../../services/check-unique.service";
import { removeFromOrderedAttributes } from "../../services/remove-from-ordered-attributes.service";

import { generatemForBlueprint } from "./generate-mFor-Blueprint.logic";
import { resolvePropertyLookup } from "../../services/resolve-property-lookup.logic";

import { MintElement } from "../../models/mint-nodes/MintElement.model";
import { MintComponent } from "../../models/mint-nodes/MintComponent.model";
import { ForBlueprint } from "../../models/blueprint/ForBlueprint.model";
import { Blueprint } from "../../models/blueprint/Blueprint.model";
import { MintFor } from "../../models/mint-attributes/MintFor.model";
import { ComponentBlueprint } from "../../models/blueprint/ComponentBlueprint.model";
import { ElementBlueprint } from "../../models/blueprint/ElementBlueprint.model";

import { I_mFor } from "../../interfaces/I_mFor.interface";
import { IRootScope } from "../../interfaces/IRootScope.interface";
import { IMainScope } from "../../interfaces/IMainScope.interface";

import { MINT_ERROR, MINT_WARN } from "../../data/constants.data";

import { FOR_Type } from "../../enum/FOR_Type.enum";

import { TParentBlueprint } from "../../types/TParentBlueprint.type";
import { TonGenerate } from "../../types/MintAttributes/TonGenerate.type";

const createmForObject = ({
  forKey,
  forValue,
  mForType,
  mintNode,
  parentScope,
  parentBlueprint,
  _rootScope,
  isSVG,
}: {
  forKey: string;
  mForType?: FOR_Type;
  forValue: string;
  mintNode: MintElement | MintComponent;
  parentScope: IMainScope;
  parentBlueprint: null | TParentBlueprint;
  _rootScope: IRootScope;
  isSVG: boolean;
}): I_mFor => {
  const initialForData = resolvePropertyLookup(forValue, parentScope);

  if (!(initialForData instanceof Array) || initialForData === undefined) {
    throw new Error(
      `${MINT_ERROR} Must pass in an Array or undefined to mFor (mFor: "${forValue}")`
    );
  }

  // ** Here we run a check against the mKey to check there are no duplicates.
  // ** We only want to include one for each key match and ignore duplicates.
  const checkUnique = checkUniqueService(forKey);
  const cloneForData = [...initialForData];
  const forData: Array<any> = [];
  for (let [i, x] of cloneForData.entries()) {
    if (checkUnique(x, i, cloneForData)) {
      forData.push(x);
    }
  }
  // ** Duplicates won't cause errors but we warn the user because its isn't expected.
  if (initialForData.length !== forData.length) {
    console.warn(
      `mFor -- duplicate elements detected. Only one instance will be rendered. Check mKey value. ${forKey}`
    );
  }

  const currentForRenders: Array<ComponentBlueprint | ElementBlueprint> = [];
  for (let [i, x] of forData.entries()) {
    currentForRenders.push(
      generatemForBlueprint(
        mintNode,
        parentScope,
        parentBlueprint,
        x,
        i,
        _rootScope,
        isSVG
      )
    );
  }

  return {
    forKey,
    forValue,
    mintNode,
    scope: parentScope,
    forData,
    currentForRenders,
    oldForDataLength: forData.length,
    mForType,
  };
};

export const generateMFor: TonGenerate<{
  mForInstance: MintFor;
  forValue: string;
}> = ({
  mForInstance,
  forValue,
  node,
  orderedProps,
  props,
  parentScope,
  parentBlueprint,
  _rootScope,
  isSVG,
}) => {
  const mintNode = node.mintNode;

  // <@ REMOVE FOR PRODUCTION
  {
    if (props.mKey === undefined) {
      console.error(mintNode);
      throw new Error(`${MINT_ERROR} mFor must have a mKey attribute`);
    }
  }
  // @>

  const forKey = props.mKey;

  // <@ REMOVE FOR PRODUCTION
  {
    if (forKey.includes(" ")) {
      console.warn(
        `${MINT_WARN} mKey value defined with a space, this may be a mistake. Value: "${forKey}".`
      );
    }
  }
  // @>

  // <@ REMOVE FOR PRODUCTION
  if (forValue.includes(" ")) {
    console.warn(
      `${MINT_WARN} mFor value defined with a space, this may be a mistake. Value: "${forValue}".`
    );
  }
  // @>

  const mForType = props.mForType ?? FOR_Type.default;

  removeFromOrderedAttributes(orderedProps, props, ["mKey", "mForType"]);

  mForInstance._mFor = createmForObject({
    forKey,
    forValue,
    mForType,
    mintNode: mintNode as MintElement | MintComponent,
    parentScope,
    parentBlueprint,
    _rootScope,
    isSVG,
  });

  const collection = mForInstance._mFor.currentForRenders;

  mForInstance.blueprint = new ForBlueprint({
    mintNode: mintNode as MintElement | MintComponent,
    orderedProps,
    props,
    scope: parentScope,
    parentBlueprint,
    _rootScope,
    collection: collection as Array<Blueprint>,
    isSVG: isSVG || undefined,
  });

  return {
    condition: true,
    value: mForInstance.blueprint,
  };
};

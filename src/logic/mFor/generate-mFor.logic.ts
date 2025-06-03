import { checkUniqueService } from "../../services/check-unique.service";
import { removeFromOrderedAttributes } from "../../services/remove-from-ordered-attributes.service";

import { resolvePropertyLookup } from "../../services/resolve-property-lookup.logic";
import { generatemForBlueprint } from "./common/generate-for-blueprint.logic";

import { MintElement } from "../../models/mint-nodes/MintElement.model";
import { MintComponent } from "../../models/mint-nodes/MintComponent.model";
import { ForBlueprint } from "../../models/blueprint/ForBlueprint.model";
import { MintFor } from "../../models/mint-attributes/MintFor.model";
import { ComponentBlueprint } from "../../models/blueprint/ComponentBlueprint.model";
import { ElementBlueprint } from "../../models/blueprint/ElementBlueprint.model";

import { I_mFor } from "../../interfaces/I_mFor.interface";
import { IRootScope } from "../../interfaces/IRootScope.interface";
import { IMainScope } from "../../interfaces/IMainScope.interface";
import { IProps } from "../../interfaces/IProps.interface";
import { INode } from "../../interfaces/INode.interface";

import { MINT_ERROR, MINT_WARN } from "../../data/constants.data";

import { FOR_Type } from "../../enum/FOR_Type.enum";

import { TParentBlueprint } from "../../types/TParentBlueprint.type";
import { TonGenerate } from "../../types/MintAttributes/TonGenerate.type";
import { refreshBlueprints } from "../refresh/refresh-blueprints.logic";
import { TRefresh } from "../../types/TRefresh.type";
import { refreshMFor } from "./refresh-mFor.logic";
import { getBlueprintIndex } from "../common/get-blueprint-index.logic";

const createmForObject = ({
  forKey,
  forValue,
  mForType,
  nodeToClone,
  _children,
  parentScope,
  orderedProps,
  props,
  parentBlueprint,
  _rootScope,
  isSVG
}: {
  forKey: string;
  mForType?: FOR_Type;
  forValue: string;
  nodeToClone: MintElement | MintComponent;
  _children: null | Array<INode>;
  parentScope: IMainScope;
  orderedProps: Array<string>;
  props: IProps;
  parentBlueprint: null | TParentBlueprint;
  _rootScope: IRootScope;
  isSVG: boolean;
}): I_mFor => {
  const initialForData = resolvePropertyLookup(forValue, parentScope);

  if (!(initialForData instanceof Array) || initialForData === undefined) {
    throw new Error(`${MINT_ERROR} Must pass in an Array or undefined to mFor (mFor: "${forValue}")`);
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
        nodeToClone,
        parentScope,
        orderedProps,
        props,
        _children,
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
    nodeToClone,
    scope: parentScope,
    forData,
    currentForRenders,
    oldForDataLength: forData.length,
    mForType,
    _children
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
  _children,
  parentScope,
  parentBlueprint,
  _rootScope,
  isSVG
}) => {
  const nodeToClone = node.mintNode;

  if (mForInstance.generated) return { condition: false };

  // <@ REMOVE FOR PRODUCTION
  {
    if (props.mKey === undefined) {
      console.error(nodeToClone);
      throw new Error(`${MINT_ERROR} mFor must have a mKey attribute`);
    }
  }
  // @>

  const forKey = props.mKey;

  // <@ REMOVE FOR PRODUCTION
  {
    if (forKey.includes(" ")) {
      console.warn(`${MINT_WARN} mKey value defined with a space, this may be a mistake. Value: "${forKey}".`);
    }
  }
  // @>

  // <@ REMOVE FOR PRODUCTION
  if (forValue.includes(" ")) {
    console.warn(`${MINT_WARN} mFor value defined with a space, this may be a mistake. Value: "${forValue}".`);
  }
  // @>

  mForInstance.generated = true;

  const mForType = props.mForType ?? FOR_Type.default;

  // removeFromOrderedAttributes(orderedProps, props, [
  //   "mFor",
  //   "mKey",
  //   "mForType",
  // ]);

  mForInstance._mFor = createmForObject({
    forKey,
    forValue,
    mForType,
    nodeToClone: nodeToClone as MintElement | MintComponent,
    _children,
    parentScope,
    orderedProps,
    props,
    parentBlueprint,
    _rootScope,
    isSVG
  });

  const forListBlueprints = mForInstance._mFor.currentForRenders;

  const runRefresh: TRefresh = (blueprint: ForBlueprint, options) => {
    // refreshBlueprints(blueprint.forListBlueprints);

    refreshMFor(blueprint, {
      _mFor: mForInstance._mFor,
      ...options
    });
  };

  mForInstance.blueprint = new ForBlueprint({
    render: mForInstance.onRender,
    // refresh: mForInstance.onRefresh,
    refresh: runRefresh,
    nodeToClone: nodeToClone as MintElement | MintComponent,
    orderedProps,
    props,
    scope: parentScope,
    parentBlueprint,
    _rootScope,
    forListBlueprints,
    // collection: collection as Array<Blueprint>,
    isSVG: isSVG || undefined
  });

  return {
    condition: true,
    value: mForInstance.blueprint
  };
};

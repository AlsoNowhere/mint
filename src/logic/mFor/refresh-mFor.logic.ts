import { checkUniqueService } from "../../services/check-unique.service";

import { recycleMForData } from "./recycleMForData.logic";
import { addElement } from "../common/add-element.logic";
import { matchElements } from "./match-elements.logic";
import { getParentElement } from "../common/get-parent-element.logic";
import { resolvePropertyLookup } from "../../services/resolve-property-lookup.logic";
import { generatemForBlueprint } from "./common/generate-for-blueprint.logic";
import { getBlueprintIndex } from "../common/get-blueprint-index.logic";

import { Blueprint } from "../../models/blueprint/Blueprint.model";
import { ForBlueprint } from "../../models/blueprint/ForBlueprint.model";
import { ElementBlueprint } from "../../models/blueprint/ElementBlueprint.model";
import { ComponentBlueprint } from "../../models/blueprint/ComponentBlueprint.model";

import { IForData } from "../../interfaces/IForData.interface";
import { I_mFor } from "../../interfaces/I_mFor.interface";

import { MINT_ERROR } from "../../data/constants.data";

import { TElement } from "../../types/TElement.type";
import { TShouldExit } from "../../types/TShouldExit.type";

import { FOR_Type } from "../../enum/FOR_Type.enum";

import { _DevLogger_ } from "../../_DEV_/_DevLogger_";
import { removeList } from "../common/remove-list.logic";

type AddElementsOptions = {
  childBlueprints: Array<Blueprint>;
  parentElement: TElement;
  blueprintIndex: number;
};

const handleErrorsAndWarnings = (blueprint: ForBlueprint, mFor: I_mFor) => {
  const { nodeToClone, orderedProps, props, forListBlueprints, parentBlueprint, _rootScope, isSVG } = blueprint;

  const { blueprintIndex } = getBlueprintIndex(blueprint);

  const childBlueprints = parentBlueprint?.childBlueprints ?? (_rootScope._rootChildBlueprints as Array<Blueprint>);

  const parentScope = parentBlueprint?.scope ?? _rootScope;

  const { forKey } = mFor;

  /* Dev */
  // _DevLogger_("REFRESH", "mFor: ", mFor);

  const protoForData = resolvePropertyLookup(mFor.forValue, parentScope);

  // <@ REMOVE FOR PRODUCTION
  if (!(protoForData instanceof Array) && protoForData !== undefined) {
    throw new Error(`${MINT_ERROR} Must pass in an Array or undefined to mFor (mFor: "${mFor.forValue}")`);
  }
  // @>

  // ** Here we run a check against the mKey to check there are no duplicates.
  // ** We only want to include one for each key match and ignore duplicates.
  const checkUnique = checkUniqueService(forKey);
  const cloneProtoForData = [...protoForData];
  const forData: Array<any> = [];
  for (let [i, x] of cloneProtoForData.entries()) {
    if (checkUnique(x, i, cloneProtoForData)) {
      forData.push(x);
    }
  }
  // ** Duplicates won't cause errors but we warn the user because its isn't expected.
  if (protoForData.length !== forData.length) {
    console.warn(
      `mFor -- duplicate elements detected. Only one instance will be rendered. Check mKey value. ${forKey}`
    );
  }

  const parentElement = getParentElement(blueprint);

  return {
    forKey,
    forData,
    blueprintIndex,
    parentElement,
    nodeToClone,
    orderedProps,
    props,
    parentScope,
    forListBlueprints,
    childBlueprints,
    parentBlueprint,
    _rootScope,
    isSVG
  };
};

const changeElementPosition = (
  forRender: ElementBlueprint | ComponentBlueprint,
  requiredIndex: number,
  forRenders: Array<ElementBlueprint | ComponentBlueprint>,
  allElements: Array<TElement>,
  options: AddElementsOptions
) => {
  const element = forRender.element;
  if (element === undefined) return;
  const { parentElement } = element;
  if (requiredIndex >= forRenders.length - 1) {
    addElement(element, options.parentElement, options.childBlueprints, options.blueprintIndex);
  } else {
    const targetElement = allElements[requiredIndex];
    parentElement?.insertBefore(element, targetElement);
  }
};

const rearrangeElements = (forRenders: Array<ElementBlueprint | ComponentBlueprint>, options: AddElementsOptions) => {
  const allElements: Array<TElement> = [];
  for (let x of [...options.parentElement.children]) {
    for (let y of forRenders) {
      if (y.element === x) {
        allElements.push(x as TElement);
      }
    }
  }

  for (let [i, item] of forRenders.entries()) {
    const element = item.element;
    if (element === undefined) {
      continue;
    }
    const index = i;
    const locationIndex = allElements.indexOf(element);
    if (index !== locationIndex) {
      changeElementPosition(item, index, forRenders, allElements, options);
      rearrangeElements(forRenders, options);
      break;
    }
  }
};

export const refreshMFor = (
  blueprint: ForBlueprint,
  { _mFor, newlyInserted }: { _mFor: I_mFor; newlyInserted: boolean }
) => {
  const {
    forKey,
    forData,
    blueprintIndex,
    parentElement,
    nodeToClone,
    orderedProps,
    props,
    parentScope,
    parentBlueprint,
    forListBlueprints,
    childBlueprints,
    _rootScope,
    isSVG
  } = handleErrorsAndWarnings(blueprint, _mFor);

  _mFor.forData = forData;
  const newList = forData;
  _mFor.oldForDataLength = newList.length;

  /* Dev */
  // _DevLogger_("REFRESH", "mFor: ", forData);

  // ** New list
  const newCurrentForRenders: Array<Blueprint | Object | string | number> = [];

  // ** Find if each new item already exists on current list of childBlueprints.
  // ** If not then add the scope only. That way we can check which are already blueprinted
  // ** and blueprint the ones that aren't later.
  for (let [i, item] of newList.entries()) {
    let newCurrentRender: Blueprint | undefined = undefined;

    for (let x of forListBlueprints) {
      const { scope } = x;
      if (scope === undefined) continue;
      if (forKey === "_i") {
        if (i === scope["_i"]) {
          newCurrentRender = x;
          break;
        }
        continue;
      }
      if (forKey === "_x") {
        if (item === scope["_x"]) {
          newCurrentRender = x;
          break;
        }
        continue;
      }
      if (item[forKey] === scope[forKey]) {
        newCurrentRender = x;
      }
    }

    newCurrentForRenders.push(newCurrentRender || item);
    i++;
  }

  // ** Here we take the newly sorted renders and make sure they are all Blueprints
  // ** if not already.
  const forRenders: Array<ElementBlueprint | ComponentBlueprint> = [];
  for (let [i, x] of newCurrentForRenders.entries()) {
    if (x instanceof Blueprint) {
      forRenders.push(x as ElementBlueprint);
    } else {
      forRenders.push(
        generatemForBlueprint(
          nodeToClone,
          parentScope,
          orderedProps,
          props,
          _mFor._children,
          parentBlueprint,
          x,
          i,
          _rootScope,
          isSVG
        )
      );
    }
  }

  _mFor.currentForRenders = forRenders;

  if (_mFor.mForType === FOR_Type.match) {
    const oldList = [..._mFor.currentForRenders];
    matchElements(_mFor.currentForRenders, oldList, newList, forKey);
    for (let [i, { scope }] of _mFor.currentForRenders.entries()) {
      recycleMForData(scope as IForData, newList[i], i);
    }
  } else if (_mFor.mForType === FOR_Type.default) {
    for (let [i, { scope }] of _mFor.currentForRenders.entries()) {
      recycleMForData(scope as IForData, newList[i], i);
    }
  }

  // ** Cycle through old list and if its not on the new list then remove this element.
  for (let currentRender of forListBlueprints) {
    if (!newCurrentForRenders.includes(currentRender)) {
      if (!currentRender.fragment) {
        const element = currentRender.element;
        element?.parentElement?.removeChild(element);
      } else {
        const collection = currentRender.collection as Array<Blueprint>;
        removeList(collection);
      }
    }
  }

  // ** Cycle through new list and if its not on the old list then add this element.
  for (let targetRender of forRenders) {
    if (!forListBlueprints.includes(targetRender)) {
      const element = targetRender.element;
      if (element !== undefined) {
        addElement(element, parentElement, childBlueprints, blueprintIndex);
      }
    }
  }

  for (let targetRender of forRenders) {
    const { mintNode } = targetRender;
    if (mintNode === null) continue;
    if (!forListBlueprints.includes(targetRender)) {
      mintNode.render?.(targetRender as Blueprint, parentElement, childBlueprints, blueprintIndex);
    } else {
      mintNode.refresh?.(targetRender as Blueprint, parentElement, {
        newlyInserted
      });
    }
  }

  // ** We need to make sure that things are kept in sync.
  // ** Here we tell the forListBlueprints about the new list of Blueprints, either added or removed.
  {
    forListBlueprints.length = 0;
    for (let x of forRenders) {
      forListBlueprints.push(x);
    }
  }

  rearrangeElements(forRenders, {
    childBlueprints,
    parentElement,
    blueprintIndex
  });

  return {
    condition: true,
    value: blueprint
  } as TShouldExit;
};

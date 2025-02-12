import { checkUniqueService } from "../../services/check-unique.service";

import { recycleMForData } from "./recycleMForData.logic";
import { addElement } from "../common/add-element.logic";
import { matchElements } from "./match-elements.logic";
import { generatemForBlueprint } from "./generate-mFor-Blueprint.logic";
import { getParentElement } from "../common/get-parent-element.logic";
import { resolvePropertyLookup } from "../../services/resolve-property-lookup.logic";

import { Blueprint } from "../../models/blueprint/Blueprint.model";
import { ForBlueprint } from "../../models/blueprint/ForBlueprint.model";
import { MintElement } from "../../models/mint-nodes/MintElement.model";
import { MintComponent } from "../../models/mint-nodes/MintComponent.model";
import { ElementBlueprint } from "../../models/blueprint/ElementBlueprint.model";
import { ComponentBlueprint } from "../../models/blueprint/ComponentBlueprint.model";

import { IForData } from "../../interfaces/IForData.interface";
import { I_mFor } from "../../interfaces/I_mFor.interface";

import { MINT_ERROR } from "../../data/constants.data";

import { TElement } from "../../types/TElement.type";
import { TShouldExit } from "../../types/TShouldExit.type";
import { TRefresh } from "../../types/TRefresh.type";

import { FOR_Type } from "../../enum/FOR_Type.enum";

import { _DevLogger_ } from "../../_DEV_/_DevLogger_";

type AddElementsOptions = {
  childBlueprints: Array<Blueprint>;
  parentElement: TElement;
  blueprintIndex: number;
};

const handleErrorsAndWarnings = (blueprint: ForBlueprint, mFor: I_mFor) => {
  const { mintNode, collection, parentBlueprint, _rootScope, isSVG } =
    blueprint;

  const childBlueprints =
    parentBlueprint?.childBlueprints ??
    (_rootScope._rootChildBlueprints as Array<Blueprint>);

  const parentScope = parentBlueprint?.scope ?? _rootScope;

  const { forKey } = mFor;

  /* Dev */
  // _DevLogger_("REFRESH", "mFor: ", mFor);

  const protoForData = resolvePropertyLookup(mFor.forValue, parentScope);

  // <@ REMOVE FOR PRODUCTION
  if (!(protoForData instanceof Array) && protoForData !== undefined) {
    throw new Error(
      `${MINT_ERROR} Must pass in an Array or undefined to mFor (mFor: "${mFor.forValue}")`
    );
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
    parentElement,
    mintNode,
    parentScope,
    parentBlueprint,
    collection,
    childBlueprints,
    _rootScope,
    isSVG,
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
    addElement(
      element,
      options.parentElement,
      options.childBlueprints,
      options.blueprintIndex
    );
  } else {
    const targetElement = allElements[requiredIndex];
    parentElement?.insertBefore(element, targetElement);
  }
};

const rearrangeElements = (
  forRenders: Array<ElementBlueprint | ComponentBlueprint>,
  options: AddElementsOptions
) => {
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
  blueprintIndex: number,
  { _mFor, newlyInserted }: { _mFor: I_mFor; newlyInserted: boolean }
) => {
  const {
    forKey,
    forData,
    parentElement,
    mintNode,
    parentScope,
    parentBlueprint,
    collection,
    childBlueprints,
    _rootScope,
    isSVG,
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
  // {

  for (let [i, item] of newList.entries()) {
    let newCurrentRender: Blueprint | undefined = undefined;

    for (let x of collection) {
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

  const forRenders: Array<ElementBlueprint | ComponentBlueprint> = [];
  for (let [i, x] of newCurrentForRenders.entries()) {
    if (x instanceof Blueprint) {
      forRenders.push(x as ElementBlueprint);
    } else {
      forRenders.push(
        generatemForBlueprint(
          mintNode as MintElement | MintComponent,
          parentScope,
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
  for (let currentRender of collection) {
    if (
      !newCurrentForRenders.includes(currentRender) &&
      currentRender instanceof ElementBlueprint
    ) {
      const element = currentRender.element;
      element?.parentElement?.removeChild(element);
    }
  }

  for (let targetRender of forRenders) {
    if (!collection.includes(targetRender)) {
      const element = targetRender.element;
      if (element !== undefined) {
        addElement(element, parentElement, childBlueprints, blueprintIndex);
      }
    }
  }

  for (let targetRender of forRenders) {
    if (!collection.includes(targetRender)) {
      targetRender.mintNode.render(
        targetRender as Blueprint,
        parentElement,
        childBlueprints,
        blueprintIndex
      );
    } else {
      const _refresh = targetRender.mintNode.refresh as TRefresh;
      _refresh(targetRender as Blueprint, {
        newlyInserted,
      });
    }
  }

  // ** We need to make sure that things are kept in sync.
  // ** Here we tell the collection about the new list of Blueprints, either added or removed.
  {
    collection.length = 0;
    for (let x of forRenders) {
      collection.push(x);
    }
  }

  rearrangeElements(forRenders, {
    childBlueprints,
    parentElement,
    blueprintIndex,
  });

  return {
    condition: true,
    value: blueprint,
  } as TShouldExit;
};

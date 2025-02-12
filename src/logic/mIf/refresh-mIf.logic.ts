import { addElement } from "../common/add-element.logic";

import { generateBlueprints } from "../generate/generate-blueprints.logic";
import { removeList } from "../common/remove-list.logic";
import { resolvePropertyLookup } from "../../services/resolve-property-lookup.logic";
import { getBlueprintIndex } from "../common/get-blueprint-index.logic";
import { renderBlueprints } from "../render/render-blueprints.logic";

import { Blueprint } from "../../models/blueprint/Blueprint.model";
import { IfBlueprint } from "../../models/blueprint/IfBlueprint.model";
import { ElementBlueprint } from "../../models/blueprint/ElementBlueprint.model";
import { ComponentBlueprint } from "../../models/blueprint/ComponentBlueprint.model";
import { MintElement } from "../../models/mint-nodes/MintElement.model";
import { MintComponent } from "../../models/mint-nodes/MintComponent.model";
import { CreateNode } from "../../models/CreateNode.model";

import { I_mIf } from "../../interfaces/I_mIf.interface";

import { TElement } from "../../types/TElement.type";

import { _DevLogger_ } from "../../_DEV_/_DevLogger_";

const resolveState = (mIf: I_mIf) => {
  const { ifValue, inverse, scope } = mIf;

  const result = resolvePropertyLookup(ifValue, scope);

  return inverse ? !result : !!result;
};

const fromFalseNotBlueprintedToTrue = (
  blueprint: IfBlueprint,
  parentElement: TElement,
  options: {
    mIf: I_mIf;
    newState: boolean;
    newlyInserted: boolean;
  }
): { newState: boolean; newlyInserted: boolean } => {
  let newBlueprint: Blueprint = blueprint;
  const { mIf, newState, newlyInserted } = options;

  const ifBlueprint = blueprint as IfBlueprint;

  const { _rootScope } = blueprint;
  const { mintNode, parentBlueprint, scope, isSVG } = ifBlueprint;

  const cloneMintContent = new CreateNode(
    mintNode as MintElement | MintComponent,
    ifBlueprint.props,
    ifBlueprint.content
  );

  [newBlueprint] = generateBlueprints({
    nodes: [cloneMintContent],
    scope,
    parentBlueprint,
    _rootScope,
    isSVG,
  });

  // ** We need to replace this previous IfBlueprint as its not longer the correct context.
  if (parentBlueprint !== null) {
    const { childBlueprints, collection } = parentBlueprint;
    if (childBlueprints !== undefined) {
      let index: number = -1;
      for (let [i, x] of childBlueprints.entries()) {
        if (x === ifBlueprint) {
          index = i;
        }
      }
      childBlueprints.splice(index, 1, newBlueprint);
    }
    if (collection !== undefined) {
      let index: number = -1;
      for (let [i, x] of collection.entries()) {
        if (x === ifBlueprint) {
          index = i;
        }
      }
      collection.splice(index, 1, newBlueprint);
    }
  } else {
    const { _rootChildBlueprints } = blueprint._rootScope;
    let index: number = -1;
    for (let [i, x] of _rootChildBlueprints.entries()) {
      if (x === ifBlueprint) {
        index = i;
      }
    }
    _rootChildBlueprints.splice(index, 1, newBlueprint);
  }

  mIf.blueprinted = true;

  const { blueprintList, blueprintIndex } = getBlueprintIndex(newBlueprint);

  parentElement !== undefined &&
    renderBlueprints([newBlueprint], parentElement, blueprintList, [
      blueprintIndex,
    ]);

  return { newState, newlyInserted };
};

const fromFalseToTrue = (
  blueprint: ElementBlueprint | ComponentBlueprint,
  parentElement: TElement,
  parentBlueprintList: Array<Blueprint>,
  blueprintIndex: number
) => {
  const { element, collection } = blueprint;

  if (element !== undefined) {
    addElement(element, parentElement, parentBlueprintList, blueprintIndex);
  }
  if (collection !== undefined) {
    for (let x of collection) {
      renderBlueprints([x], parentElement, parentBlueprintList, [
        blueprintIndex,
      ]);
    }
  }
};

const fromTrueToFalse = (blueprint: ElementBlueprint | ComponentBlueprint) => {
  removeList([blueprint]);
};

const stateShift = (
  blueprint: ElementBlueprint | ComponentBlueprint | IfBlueprint,
  parentElement: TElement,
  parentBlueprintList: Array<Blueprint>,
  blueprintIndex: number,
  mIf: I_mIf
): { newState?: boolean; newlyInserted?: boolean } => {
  if (mIf === undefined) return {};

  const oldState = mIf.state;

  mIf.state = resolveState(mIf);

  const newState = mIf.state;

  let newlyInserted = false;

  /* Dev */
  // _DevLogger_("REFRESH", "mIf: ", mIf, oldState, newState);

  // ** Change in state -> Do something
  if (oldState !== newState) {
    // ** Is now TRUE
    if (newState === true) {
      newlyInserted = true;

      // ** WAS NOT previously rendered -> Add
      if (mIf.blueprinted === false) {
        // ** WAS NOT previously blueprinted -> Blueprint first, then Add
        return fromFalseNotBlueprintedToTrue(
          blueprint as IfBlueprint,
          parentElement,
          {
            mIf,
            newState,
            newlyInserted,
          }
        );
      } else {
        // ** WAS previously blueprinted -> Add back
        fromFalseToTrue(
          blueprint as ElementBlueprint | ComponentBlueprint,
          parentElement,
          parentBlueprintList,
          blueprintIndex
        );
      }
    }
    // ** Is now FALSE
    else if (blueprint instanceof Blueprint) {
      // ** WAS previously rendered -> Remove
      fromTrueToFalse(blueprint as ElementBlueprint | ComponentBlueprint);
    }
  }

  return { newState, newlyInserted };
};

export const refreshMIf = (
  mIf: I_mIf,
  blueprint: ElementBlueprint | ComponentBlueprint | IfBlueprint,
  parentElement: TElement,
  parentBlueprintList: Array<Blueprint>,
  blueprintIndex: number,
  options: {
    newlyInserted: boolean;
  }
) => {
  const oldBlueprinted = mIf.blueprinted;

  const { newState, newlyInserted } = stateShift(
    blueprint,
    parentElement,
    parentBlueprintList,
    blueprintIndex,
    mIf
  );

  options.newlyInserted = newlyInserted ?? false;

  if (oldBlueprinted === false && newState === true) {
    return { condition: true, value: blueprint };
  }

  if (newState === false) return { condition: true, value: blueprint };

  return { condition: false, value: undefined };
};

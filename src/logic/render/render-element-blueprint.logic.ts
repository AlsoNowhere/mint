import { renderBlueprints } from "./render-blueprints.logic";
import { addElement } from "../common/add-element.logic";
import { renderAttributes } from "./attributes/render-attributes.logic";

import { ElementBlueprint } from "../../models/blueprint/ElementBlueprint.model";

import { TRender } from "../../types/TRender.type";

import { _DevLogger_ } from "../../_DEV_/_DevLogger_";

export const renderElementBlueprint: TRender = (
  blueprint: ElementBlueprint,
  parentElement,
  parentChildBlueprints,
  blueprintIndex
) => {
  const { element, collection, childBlueprints } = blueprint;

  /* Dev */
  // _DevLogger_("RENDER", "ELEMENT", blueprint, blueprintIndex);

  if (element !== undefined) {
    // renderAttributes(element, orderedAttributes, attributes, scope);
    renderAttributes(blueprint);
  }

  // ** Here we add the Element to the parentElement, if there is an Element.
  if (element !== undefined) {
    addElement(element, parentElement, parentChildBlueprints, blueprintIndex);
  }

  // ** Here we add the collection of Elements if there is a collection.
  if (collection !== undefined) {
    for (let x of collection) {
      renderBlueprints([x], parentElement, parentChildBlueprints, [blueprintIndex]);
    }
  }

  // ** Here we handle the children of this Element, if it has any.
  if (!!childBlueprints) {
    renderBlueprints(childBlueprints, element ?? parentElement);
  }
};

import { addElement } from "../common/add-element.logic";
import { renderBlueprints } from "./render-blueprints.logic";
import { renderAttributes } from "./attributes/render-attributes.logic";

import { ComponentBlueprint } from "../../models/blueprint/ComponentBlueprint.model";

import { TRender } from "../../types/TRender.type";

import { _DevLogger_ } from "../../_DEV_/_DevLogger_";

export const renderComponentBlueprint: TRender = (
  blueprint: ComponentBlueprint,
  parentElement,
  parentChildBlueprints,
  blueprintIndex
) => {
  /* Dev */
  // _DevLogger_("RENDER", "COMPONENT", blueprint, blueprintIndex);

  const {
    element,
    orderedAttributes,
    attributes,
    scope,
    collection,
    childBlueprints,
  } = blueprint;

  // ** LIFECYCLE CALL
  scope.oninit?.({ scope });
  scope.oninsert?.({ scope });
  scope.oneach?.({ scope });

  if (element !== undefined) {
    renderAttributes(element, orderedAttributes, attributes, scope);
  }

  // ** Here we add the Component Element to the parentElement, if there is a Component Element.
  if (element !== undefined) {
    addElement(element, parentElement, parentChildBlueprints, blueprintIndex);
  }

  // ** Here we add the collection of Component Elements if there is a collection.
  if (collection !== undefined) {
    for (let x of collection) {
      renderBlueprints([x], parentElement, parentChildBlueprints, [
        blueprintIndex,
      ]);
    }
  }

  // ** Here we handle the children of this Component, if it has any.
  if (!!childBlueprints) {
    renderBlueprints(childBlueprints, element ?? parentElement);
  }

  // ** LIFECYCLE CALL
  scope.onafterinsert?.({ scope });
  scope.onaftereach?.({ scope });

  return;
};

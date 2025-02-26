import { refreshBlueprints } from "./refresh-blueprints.logic";
import { refreshAttributes } from "./attributes/refresh-attributes.logic";
import { resolveMAttributesOnRefresh } from "../resolve-m-attributes/on-refresh.logic";

import { ElementBlueprint } from "../../models/blueprint/ElementBlueprint.model";

import { TonRefresh } from "../../types/MintAttributes/TonRefresh.type";

import { _DevLogger_ } from "../../_DEV_/_DevLogger_";

export const refreshElementBlueprint: TonRefresh = (
  blueprint: ElementBlueprint,
  parentElement,
  options
) => {
  /* Dev */
  // _DevLogger_("REFRESH", "ELEMENT", blueprint);

  const {
    element,
    collection,
    orderedAttributes,
    attributes,
    scope,
    childBlueprints,
  } = blueprint;

  const shouldReturn = resolveMAttributesOnRefresh(
    blueprint,
    parentElement,
    options
  );

  if (shouldReturn.condition) {
    return shouldReturn;
  }

  if (element !== undefined && !(element instanceof Text)) {
    refreshAttributes(element, orderedAttributes, attributes, scope);
  }

  if (!!collection) {
    refreshBlueprints(collection, options);
  }

  if (!!childBlueprints) {
    refreshBlueprints(childBlueprints, options);
  }

  return shouldReturn;
};

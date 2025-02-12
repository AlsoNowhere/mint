import { applyScopeTransformers } from "../common/apply-scope-transformers.logic";
import { assignProps } from "../common/assign-props.logic";
import { refreshBlueprints } from "./refresh-blueprints.logic";
import { refreshAttributes } from "./attributes/refresh-attributes.logic";
import { resolveMAttributesOnRefresh } from "../resolve-m-attributes/on-refresh.logic";

import { ComponentBlueprint } from "../../models/blueprint/ComponentBlueprint.model";

import { TonRefresh } from "../../types/MintAttributes/TonRefresh.type";

import { _DevLogger_ } from "../../_DEV_/_DevLogger_";

export const refreshComponentBlueprint: TonRefresh = (
  blueprint: ComponentBlueprint,
  parentElement,
  blueprintList,
  blueprintIndex,
  options: { newlyInserted: boolean }
) => {
  /* Dev */
  // _DevLogger_("REFRESH", "COMPONENT: ", blueprint);

  const {
    element,
    orderedProps,
    props,
    orderedAttributes,
    attributes,
    scope,
    parentBlueprint,
    collection,
    childBlueprints,
  } = blueprint;

  applyScopeTransformers(scope);

  {
    const parentScope = parentBlueprint?.scope ?? blueprint._rootScope;
    assignProps(scope, orderedProps, props, parentScope);
  }

  const shouldReturn = resolveMAttributesOnRefresh(
    blueprint,
    parentElement,
    blueprintList,
    blueprintIndex,
    options
  );

  if (shouldReturn.condition) {
    return shouldReturn;
  }

  // ** LIFECYCLE CALL
  options.newlyInserted && scope.oninsert?.({ scope });
  scope.oneach?.({ scope });

  if (element !== undefined && !(element instanceof Text)) {
    refreshAttributes(element, orderedAttributes, attributes, scope);
  }

  if (!!collection) {
    refreshBlueprints(collection);
  }

  if (!!childBlueprints) {
    refreshBlueprints(childBlueprints);
  }

  // ** LIFECYCLE CALL
  options.newlyInserted && scope.onafterinsert?.({ scope });
  scope.onaftereach?.({ scope });

  return shouldReturn;
};

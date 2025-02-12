import { getAllElements } from "../refresh/refresh-common/get-all-elements.logic";
import { renderMTemplate } from "./render-m-template.logic";
import { getBlueprintIndex } from "../common/get-blueprint-index.logic";
import { getParentElement } from "../common/get-parent-element.logic";
import { resolvePropertyLookup } from "../../services/resolve-property-lookup.logic";

import { MintTemplate } from "../../models/mint-nodes/MintTemplate.model";
import { TemplateBlueprint } from "../../models/blueprint/TemplateBlueprint.model";

import { TRefresh } from "../../types/TRefresh.type";

const conductRefresh = (blueprint: TemplateBlueprint) => {
  const { collection } = blueprint;
  const parentElement = getParentElement(blueprint);
  const { blueprintList: parentBlueprintList, blueprintIndex } =
    getBlueprintIndex(blueprint);

  const allElements = getAllElements(collection);

  for (let x of allElements) {
    x.parentElement?.removeChild(x);
  }

  renderMTemplate(
    blueprint,
    parentElement,
    parentBlueprintList,
    blueprintIndex
  );
};

export const refreshMTemplate: TRefresh = (blueprint: TemplateBlueprint) => {
  const { collection, scope, templateState, mintNode } = blueprint;
  const {
    options: { conditionedBy, onevery },
  } = mintNode as MintTemplate;

  // ** If there is no content to add; DO NOTHING
  if (collection === undefined) return;

  // ** If we want to refresh every time then DO that here and end.
  if (onevery === true) {
    conductRefresh(blueprint);
    return;
  }

  if (conditionedBy !== undefined) {
    const newTemplateState = resolvePropertyLookup(conditionedBy, scope);

    // ** If the conditional state hasn't changed: DO NOTHING
    if (templateState === newTemplateState) return;

    // ** Update the state for next time.
    blueprint.templateState = newTemplateState;

    conductRefresh(blueprint);
    return;
  }
};

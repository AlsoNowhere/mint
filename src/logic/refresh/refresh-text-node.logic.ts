import { deBracer } from "../../services/deBracer.service";

import { TextBlueprint } from "../../models/blueprint/TextBlueprint.model";

import { TonRefresh } from "../../types/MintAttributes/TonRefresh.type";

import { _DevLogger_ } from "../../_DEV_/_DevLogger_";

export const refreshTextNode: TonRefresh = (blueprint: TextBlueprint) => {
  const { element, textValue } = blueprint;

  /* Dev */
  // _DevLogger_("REFRESH", "TEXTNODE", textNode);

  element.nodeValue = deBracer(
    textValue,
    blueprint.scope,
    "Refresh - textNode"
  );

  return { condition: false };
};

import { deBracer } from "../../services/deBracer.service";

import { TextBlueprint } from "../../models/blueprint/TextBlueprint.model";

import { TRefresh } from "../../types/TRefresh.type";

import { _DevLogger_ } from "../../_DEV_/_DevLogger_";

export const refreshTextNode: TRefresh = (blueprint: TextBlueprint) => {
  const { element, textValue } = blueprint;

  /* Dev */
  // _DevLogger_("REFRESH", "TEXTNODE", textNode);

  element.nodeValue = deBracer(
    textValue,
    blueprint.scope,
    "Refresh - textNode"
  );
};

import { deBracer } from "../../services/deBracer.service";

import { addElement } from "../common/add-element.logic";

import { TextBlueprint } from "../../models/blueprint/TextBlueprint.model";

import { TRender } from "../../types/TRender.type";

import { _DevLogger_ } from "../../_DEV_/_DevLogger_";

export const renderTextBlueprint: TRender = (
  blueprint: TextBlueprint,
  parentElement,
  childBlueprints,
  blueprintIndex
) => {
  /* Dev */
  // _DevLogger_("RENDER", "TEXTNODE", blueprint);

  const { element, textValue, scope } = blueprint;

  if (element instanceof Text) {
    element.nodeValue = deBracer(
      textValue as string,
      scope,
      "Render - textNode"
    );
    addElement(element, parentElement, childBlueprints, blueprintIndex);
  }
};

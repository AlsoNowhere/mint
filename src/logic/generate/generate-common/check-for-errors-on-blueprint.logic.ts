import { ComponentBlueprint } from "../../../models/blueprint/ComponentBlueprint.model";
import { ElementBlueprint } from "../../../models/blueprint/ElementBlueprint.model";

import { MINT_ERROR } from "../../../data/constants.data";

export const checkForErrorsOnBlueprint = (
  blueprint: ElementBlueprint | ComponentBlueprint
) => {
  // <@ REMOVE FOR PRODUCTION
  if (blueprint.element === undefined) {
    if (blueprint.collection === undefined) {
      throw new Error(
        `${MINT_ERROR} Element Blueprint was defined without element or collection.`
      );
    }
  }
  if (blueprint.element !== undefined) {
    if (blueprint.collection !== undefined) {
      throw new Error(
        `${MINT_ERROR} Element Blueprint was defined with both element and collection.`
      );
    }
  }
  if (blueprint.collection !== undefined) {
    if (blueprint.childBlueprints !== undefined) {
      throw new Error(
        `${MINT_ERROR} Element Blueprint was defined with both collection and childBlueprints.`
      );
    }
  }
  // @>
};

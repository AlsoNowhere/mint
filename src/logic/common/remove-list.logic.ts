import { Blueprint } from "../../models/blueprint/Blueprint.model";

// ** This function takes a list of Blueprints and remove their content from
// ** their parent HTMLElement.
export const removeList = (list: Array<Blueprint>) => {
  for (let x of list) {
    const { element, collection } = x;
    if (element !== undefined) {
      element.parentElement?.removeChild(element);
    }
    if (collection !== undefined) {
      removeList(collection);
    }
  }
};

import { IProps } from "../interfaces/IProps.interface";

// ** This function takes a list of attributes to remove from the attributes
// ** of an Element's Blueprint.
export const removeFromOrderedAttributes = (
  orderedAttributes: Array<string>,
  props: IProps,
  attributeKeys: Array<string>
) => {
  for (let attr of attributeKeys) {
    // ** Find index
    let index: number = -1;
    for (let [i, x] of orderedAttributes.entries()) {
      if (x === attr) {
        index = i;
      }
    }

    // ** Remove if found
    if (index !== -1) {
      orderedAttributes.splice(index, 1);
      delete props[attr];
    }
  }
};

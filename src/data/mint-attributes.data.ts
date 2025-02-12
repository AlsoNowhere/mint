// ** IMPORTANT
// ** The order in which mint attributes are processed it important.
// ** For example: mIf, if false, should stop all other blueprinting.
export const mintAttributeOrder = ["mExtend", "mIf", "mFor", "mRef"];

export const mintAttributesList = ["mExtend", "mIf", "mFor", "mRef"];

export const attributesToIgnore = [
  "mintElement_index",
  ...mintAttributeOrder,
  "mKey",
];

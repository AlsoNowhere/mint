import { IForData } from "../../interfaces/IForData.interface";

import { forScopePermanentProperties } from "../../data/constants.data";

export const recycleMForData = (currentScope: IForData, newData: any, newIndex: number) => {
  const oldDataKeys = Object.keys(currentScope._x);

  // ** Update the Object reference:
  if (
    // ** only if _x is present already.
    currentScope.hasOwnProperty("_x") &&
    // ** AND only if the Object has changed
    currentScope._x !== newData
  ) {
    currentScope._x = newData;
  }

  // ** Delete old values no longer on this new object;
  for (let key of oldDataKeys) {
    // ** Some properties are not changed once set.
    if (forScopePermanentProperties.includes(key)) continue;

    // ** We only want to try and delete properties that are on this object, not the prototype.
    if (!newData.hasOwnProperty(key)) {
      delete currentScope[key];
    }
  }

  if (typeof newData !== "string") {
    // ** Update or create values that weren't on Scope before.
    const newDataKeys = Object.keys(newData);

    for (let key of newDataKeys) {
      // ** This check is here not because we EXPECT these values to be on the new Object but because we DON'T EXPECT.
      // ** If they are here then they will break the Mint refresh causing untold misery to millions... and
      // ** as honest folk we can't possible allow that to happen!
      if (forScopePermanentProperties.includes(key)) continue;

      currentScope[key] = newData[key];
    }
  }

  // ** Update the index.
  if (currentScope._i !== newIndex) {
    currentScope._i = newIndex;
  }
};

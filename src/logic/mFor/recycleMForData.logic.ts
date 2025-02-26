import { IForData } from "../../interfaces/IForData.interface";

import { forScopePermantProperties } from "../../data/constants.data";

export const recycleMForData = (
  currentScope: IForData,
  newData: any,
  newIndex: number
) => {
  // ** Update the Object reference:
  // ** only if the Object has changed
  // ** AND only if _x is present already.
  if (currentScope.hasOwnProperty("_x") && currentScope._x !== newData) {
    currentScope._x = newData;
  }

  // ** Delete old values no longer on this new object;
  const currentScopeKeys = Object.keys(currentScope);

  for (let key of currentScopeKeys) {
    // ** Some properties are not changed once set.
    if (forScopePermantProperties.includes(key)) continue;

    // ** We only want to try and delete properties that are on this object, not the prototype.
    if (!newData.hasOwnProperty(key)) {
      delete (currentScope as any)[key];
    }
  }

  if (typeof newData !== "string") {
    // ** Update or create values that weren't on Scope before.
    const newDataKeys = Object.keys(newData);

    for (let key of newDataKeys) {
      // ** This check is here not because we EXPECT these values to be on the new Object but because we DON'T EXPECT.
      // ** If they are here then they will break the Mint refresh causing untold misery to millions... and
      // ** as honest folk we can't possible allow that to happen!
      if (forScopePermantProperties.includes(key)) continue;

      (currentScope as any)[key] = (newData as any)[key];
    }
  }

  if (currentScope._i !== newIndex) {
    currentScope._i = newIndex;
  }
};

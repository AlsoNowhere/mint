import { IForData } from "../interfaces/IForData.interface";

export const recycleMForData = (
  currentScope: IForData,
  newData: any,
  newIndex: number
) => {
  // ** Update the Object reference, only if the Object has changed
  if (
    Object.prototype.hasOwnProperty.apply(currentScope, ["_x"]) &&
    currentScope._x !== newData
  ) {
    currentScope._x = newData;
  }

  // ** Delete old values no longer on this new object;
  Object.keys(currentScope).forEach((key) => {
    if (key === "_parent" || key === "_i" || key === "_x") return;

    if (!Object.prototype.hasOwnProperty.apply(newData, [key])) {
      if (key !== "__name") {
        delete (currentScope as any)[key];
      }
    }
  });

  // ** Update or create values that weren't on Scope before.
  Object.keys(newData).forEach((key) => {
    // ** This check is here not because we EXPECT these values to be on the new Object but because we DON'T EXPECT.
    // ** If they are here then they will break the Mint refresh causing untold misery to millions... and
    // ** as honest folk we can't possible allow that to happen!
    if (key === "_i" || key === "_x") return;

    (currentScope as any)[key] = (newData as any)[key];
  });

  if (currentScope._i !== newIndex) {
    currentScope._i = newIndex;
  }
};

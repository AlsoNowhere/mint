//  ** Creates a function that will check against a property target and return if unique.
export const checkUniqueService = (key: string) => {
  // ** item is an item in arr and arr is the full list of items.
  // ** index is the index of item in arr.
  return (item: any, index: number, arr: Array<any>) => {
    // ** This is IMPORTANT
    // ** When using the index we ignore checking for uniqueness because it will always be unique.
    if (key === "_i") return true;

    const value = item[key];

    {
      for (let [i, x] of arr.entries()) {
        // ** Find the first value on the arr that matches the provided value.
        if (x[key] === value) {
          // ** If they are at the same index then alls fine.
          if (index === i) {
            return true;
          }
          // ** If the indexes are wrong it means that there is another value with
          // ** the same value and therefore a duplicate and this is not unique.
          else {
            return false;
          }
        }
      }
    }

    return false;
  };
};

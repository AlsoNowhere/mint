export const checkUnique =
  (key: string) => (x: any, i: number, arr: Array<any>) => {
    if (key === "_i") return true;
    const outerKey = x[key];
    const innerIndex = arr.findIndex((y, j) => {
      const innerKey = y[key];
      return innerKey === outerKey;
    });
    return innerIndex === i;
  };

// ** This takes the Object (target) and extracts a value following the dot notation.
// e.g
// const obj = {
//     one: {
//         two: 2
//     }
//}
// _get(obj, "one.two") --> 2

const _get = (target: any, value: string) => {
  let output = target;
  const trail = value.split(".");
  while (trail.length > 0) {
    const [property] = trail;
    output = (output as any)[property];
    trail.shift();
  }
  return output;
};

export const getter = <T>(
  target: Object,
  property: string,
  get: (() => T) | string
) => {
  if (typeof get === "string") {
    const value = get;
    get = function () {
      return _get(this, value);
    };
  }
  Object.defineProperty(target, property, { get });
};

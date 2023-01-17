export const getter = (target: Object, property: string, get: () => any) => {
  Object.defineProperty(target, property, {
    get,
  });
};

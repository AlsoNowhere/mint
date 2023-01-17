export const renderEventAttributes = (
  element: HTMLElement | SVGElement,
  key: string,
  value: string,
  attributes: Object,
  scope: Object
) => {
  const target = key.substring(1, key.length - 1);

  element.addEventListener(target, (event: Event) => {
    const eventValue = (scope as any)[value];
    if (eventValue === undefined)
      throw new Error(`Event provided is undefined for event '${target}'.`);
    if (eventValue === null) return;
    eventValue.apply(scope, [event, element, scope]);
  });
  delete (attributes as any)[key];
};

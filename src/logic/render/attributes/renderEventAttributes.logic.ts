import { MINT_ERROR } from "../../../data/constants.data";

export const renderEventAttributes = (
  element: HTMLElement | SVGElement,
  key: string,
  value: string,
  attributes: Object,
  scope: Object
) => {
  const target = key.substring(1, key.length - 1);

  const eventValue = (scope as any)[value];
  const options = eventValue?.mintEventOptions;

  element.addEventListener(
    target,
    (event: Event) => {
      // We do not let undefined mean an absense of a value here because undefined could be an accident.
      // We check for null instead as that is not a default value.
      if (eventValue === undefined) {
        console.error(element);
        throw new Error(
          `${MINT_ERROR} Event provided is undefined, use instead null to skip, for event '${target}' - '${value}'.`
        );
      }
      if (eventValue === null) return;
      eventValue.apply(scope, [event, element, scope]);
    },
    options
  );

  delete (attributes as any)[key];
};

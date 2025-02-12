import { IAttributes } from "../../../interfaces/IAttributes.interface";

import { MINT_ERROR } from "../../../data/constants.data";

import { TElement } from "../../../types/TElement.type";

export const renderEventAttributes = (
  element: TElement,
  key: string,
  value: string,
  orderedAttributes: Array<string>,
  attributes: IAttributes,
  scope: Object
) => {
  // ** Get the function we will run on the listener from the scope.
  const eventFunction:
    | (Function & { mintEventOptions?: boolean | AddEventListenerOptions })
    | null = (scope as any)[value];

  // ** As the target value is stored inside parenthesis we extract it here.
  // ** e.g (click) -> click
  const target = key.substring(1, key.length - 1);

  const listener = (event: Event) => {
    // ** We do not let undefined mean an absense of a value here because undefined could be an accident.
    // ** We check for null instead as that is not a default value.
    if (eventFunction === undefined) {
      console.error(element);
      throw new Error(
        `${MINT_ERROR} Event provided is undefined, use instead null to skip, for event '${target}' - '${value}'.`
      );
    }

    if (eventFunction === null) return;

    eventFunction.apply(scope, [event, element, scope]);
  };

  const options = eventFunction?.mintEventOptions;

  element.addEventListener(target, listener, options);

  {
    // ** To make sure this isn't added more than once, remove it once added.
    let index: number = -1;
    for (let [i, _key] of orderedAttributes.entries()) {
      if (_key === key) {
        index = i;
      }
    }

    index !== undefined && index !== -1 && orderedAttributes.splice(index, 1);
    delete attributes[key];
  }
};

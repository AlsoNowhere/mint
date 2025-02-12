import { isAttrType } from "../common/is-attr-type.logic";

import { MintComponent } from "../../models/mint-nodes/MintComponent.model";

import { IScope } from "../../interfaces/IScope.interface";
import { IProps } from "../../interfaces/IProps.interface";

import { MINT_WARN } from "../../data/constants.data";

import { TComponentResovler } from "../../types/TComponentResolver.type";

interface IPropKey {
  key: string;
  prop: string;
  value: string;
}

export const resolvePropTypes: TComponentResovler = (
  orderedProps: Array<string>,
  props: IProps,
  mintComponent: MintComponent,
  parentScope: IScope
) => {
  // ** If this Component does not have defined propTypes then we do nothing.
  const { propTypes } = mintComponent;
  if (propTypes === undefined) return;

  const name = mintComponent.scope?.name;

  // ** Get all the binding props (e.g [prop]="value").
  const propsList: Array<IPropKey> = [];
  for (let prop of orderedProps) {
    if (isAttrType(prop, "[", "]")) {
      const key = prop.substring(1, prop.length - 1);
      propsList.push({ key, prop, value: props[prop] });
    } else {
      propsList.push({ key: prop, prop, value: props[prop] });
    }
  }

  // ** Define this easier by removing the square brackets (e.g [prop]="value" becomes {prop,value}).

  // ** Loop over the binding props.
  for (let { key, prop, value } of propsList) {
    // ** As the value could be undefined, we do nothing here.
    if (value === undefined) return;

    // ** Get the accepted types to compare to the provided type.
    const propType = propTypes[key];

    // ** If the type is "any" then we do nothing.
    if (propType === "any") return;

    // ** Get the type of the value that will be used.
    const parentType = typeof parentScope[value];

    // ** If this type is not of the accepted list of types then we should the user a warning.
    if (!propType.includes(parentType)) {
      const _types: Array<string> = [];
      for (let x of propType) {
        _types.push(`"${x}"`);
      }
      const types = _types.join(" | ");

      console.warn(
        `${MINT_WARN} Prop types clash. Component: ${name}. Prop: ${prop}. Incorrect type: ${parentType}. Allowed types: ${types}`
      );
    }
  }
};

import { MintAttribute } from "../../models/mint-attributes/MintAttribute.model";

import { INode } from "../../interfaces/INode.interface";
import { IProps } from "../../interfaces/IProps.interface";
import { IMainScope } from "../../interfaces/IMainScope.interface";
import { IRootScope } from "../../interfaces/IRootScope.interface";

import { TonGenerate } from "../../types/MintAttributes/TonGenerate.type";
import { TElement } from "../../types/TElement.type";
import { TParentBlueprint } from "../../types/TParentBlueprint.type";
import { TShouldExit } from "../../types/TShouldExit.type";

export const resolveMAttributesOnGenerate = ({
  node,
  htmlElement,
  orderedProps,
  props,
  parentScope,
  scope,
  _children,
  parentBlueprint,
  _rootScope,
  isSVG,
  isComponent,
  isAttribute,
}: {
  node: INode;
  htmlElement: TElement | undefined;
  orderedProps: Array<string>;
  props: IProps;
  parentScope: IMainScope;
  scope: IMainScope;
  _children: null | Array<INode>;
  parentBlueprint: TParentBlueprint | null;
  _rootScope: IRootScope;
  isSVG: boolean;
  isComponent: boolean;
  isAttribute: boolean;
}) => {
  let shouldExit: TShouldExit = { condition: false, value: undefined };

  for (let key of orderedProps) {
    const property = props[key];

    const resolver: TonGenerate = property.onGenerate;

    if (
      shouldExit.condition === false &&
      property instanceof MintAttribute &&
      resolver instanceof Function
    ) {
      shouldExit = resolver.apply(property, [
        {
          node,
          htmlElement,
          orderedProps,
          props,
          parentScope,
          scope,
          _children,
          parentBlueprint,
          _rootScope,
          isSVG,
          isComponent,
          isAttribute,
        },
      ]);
    }
  }

  return shouldExit;
};

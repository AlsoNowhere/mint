import { cloneProps } from "../../services/clone-props.service";
import { resolvePropsOrder } from "../../services/resolve-props-order.service";

import { fixProps } from "./generate-common/fix-props.logic";

import { Blueprint } from "../../models/blueprint/Blueprint.model";
import { CreateNode } from "../../models/CreateNode.model";

import { IRootScope } from "../../interfaces/IRootScope.interface";
import { INode } from "../../interfaces/INode.interface";
import { IMainScope } from "../../interfaces/IMainScope.interface";

import { MINT_ERROR } from "../../data/constants.data";

import { TParentBlueprint } from "../../types/TParentBlueprint.type";
import { TGenerate } from "../../types/TGenerate.type";

const generateBlueprint: TGenerate = ({
  node,
  parentBlueprint,
  scope,
  _rootScope,
  isSVG,
  useGivenScope,
}) => {
  fixProps(node.props);

  const props = cloneProps({ props: node.props ?? {} });

  /* Dev */
  // _DevLogger_("GENERATE", "Blueprint", mintContent);

  // ** ORDER IS IMPORTANT!
  // ** Here we take the attributes and order them in a specific run order.
  // ** This way they don't conflict with each other.
  const orderedProps = resolvePropsOrder(props);

  // ** Here we get the generate function for this particular mint element.
  const { generate } = node.mintNode;

  // ** If this is MintText or MintElement then the "generate" function will be on this MintNode.
  const blueprint: Blueprint = generate({
    node,
    orderedProps,
    props,
    scope,
    parentBlueprint,
    _rootScope,
    isSVG,
    useGivenScope,
  });

  return blueprint;
};

export const generateBlueprints = ({
  nodes,
  scope,
  parentBlueprint,
  _rootScope,
  isSVG = false,
  useGivenScope = false,
}: {
  nodes: Array<INode>;
  scope: IMainScope;
  parentBlueprint: TParentBlueprint | null;
  _rootScope: IRootScope;
  isSVG?: boolean;
  useGivenScope?: boolean;
}): Array<Blueprint> => {
  // <@ REMOVE FOR PRODUCTION
  if (nodes.find((x) => !(x instanceof CreateNode))) {
    throw new Error(
      `${MINT_ERROR} generateBlueprints -- nodes sent not correctly implemented.`
    );
  }
  // @>

  // ** Use parent scope if available. If it isn't, then use the rootScope.
  // ** This means that the blueprint must be at the app level.
  const blueprints: Array<any> = [];

  for (let node of nodes) {
    blueprints.push(
      generateBlueprint({
        node,
        scope,
        parentBlueprint,
        _rootScope,
        isSVG,
        useGivenScope,
      })
    );
  }

  return blueprints;
};

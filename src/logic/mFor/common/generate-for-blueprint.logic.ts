import { createForData } from "../createForData.service";

import { generateBlueprints } from "../../generate/generate-blueprints.logic";

import { Blueprint } from "../../../models/blueprint/Blueprint.model";
import { ComponentBlueprint } from "../../../models/blueprint/ComponentBlueprint.model";
import { ElementBlueprint } from "../../../models/blueprint/ElementBlueprint.model";
import { CreateNode } from "../../../models/CreateNode.model";
import { MintComponent } from "../../../models/mint-nodes/MintComponent.model";
import { MintElement } from "../../../models/mint-nodes/MintElement.model";
import { MintScope } from "../../../models/MintScope.model";

import { IMainScope } from "../../../interfaces/IMainScope.interface";
import { INode } from "../../../interfaces/INode.interface";
import { IProps } from "../../../interfaces/IProps.interface";
import { IRootScope } from "../../../interfaces/IRootScope.interface";

import { TParentBlueprint } from "../../../types/TParentBlueprint.type";

export const generatemForBlueprint = (
  nodeToClone: MintElement | MintComponent,
  parentScope: IMainScope,
  props: IProps,
  _children: null | Array<INode>,
  parentBlueprint: null | TParentBlueprint,
  data: Blueprint | Object | string | number,
  index: number,
  _rootScope: IRootScope,
  isSVG = false,
) => {
  if (data instanceof Blueprint) return data as ElementBlueprint | ComponentBlueprint;

  let newScope: IMainScope;

  if (!!nodeToClone.scope) {
    newScope = new (nodeToClone.scope ?? MintScope)();
  } else {
    newScope = parentScope || new MintScope();
  }

  const _scope = createForData(data, newScope, index);

  const mintElementClone = nodeToClone.clone();
  if (!!mintElementClone.attributes) {
    delete mintElementClone.attributes.mFor;
    delete mintElementClone.attributes.mKey;
    delete mintElementClone.attributes.mForType;
  }

  const cloneMintNode = new CreateNode(mintElementClone, mintElementClone.attributes ?? null, _children);
  cloneMintNode.props = { ...props };
  delete cloneMintNode.props.mFor;
  delete cloneMintNode.props.mKey;
  delete cloneMintNode.props.mForType;

  const [blueprint] = generateBlueprints({
    nodes: [cloneMintNode],
    scope: parentScope,
    parentBlueprint,
    _rootScope,
    isSVG,
    useGivenScope: _scope,
  });

  return blueprint as ElementBlueprint | ComponentBlueprint;
};

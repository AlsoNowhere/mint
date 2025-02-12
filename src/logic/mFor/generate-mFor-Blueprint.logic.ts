import { createForData } from "../../services/createForData.service";

import { generateBlueprints } from "../generate/generate-blueprints.logic";

import { Blueprint } from "../../models/blueprint/Blueprint.model";
import { MintScope } from "../../models/MintScope.model";
import { MintElement } from "../../models/mint-nodes/MintElement.model";
import { MintComponent } from "../../models/mint-nodes/MintComponent.model";
import { ElementBlueprint } from "../../models/blueprint/ElementBlueprint.model";
import { ComponentBlueprint } from "../../models/blueprint/ComponentBlueprint.model";
import { CreateNode } from "../../models/CreateNode.model";

import { IMainScope } from "../../interfaces/IMainScope.interface";
import { IRootScope } from "../../interfaces/IRootScope.interface";

import { TParentBlueprint } from "../../types/TParentBlueprint.type";

export const generatemForBlueprint = (
  mintNode: MintElement | MintComponent,
  scope: IMainScope,
  parentBlueprint: null | TParentBlueprint,
  data: Blueprint | Object | string | number,
  index: number,
  _rootScope: IRootScope,
  isSVG = false
) => {
  if (data instanceof Blueprint)
    return data as ElementBlueprint | ComponentBlueprint;

  let newScope: IMainScope;

  if (!!mintNode.scope) {
    newScope = new (mintNode.scope ?? MintScope)();
  } else {
    newScope = scope || new MintScope();
  }

  const _scope = createForData(data, newScope, index);

  const mintElementClone = mintNode.clone();
  if (!!mintElementClone.props) {
    delete mintElementClone.props.mFor;
    delete mintElementClone.props.mKey;
  }

  const cloneMintNode = new CreateNode(
    mintElementClone,
    mintElementClone.props ?? null,
    mintElementClone.content
  );

  const [blueprint] = generateBlueprints({
    nodes: [cloneMintNode],
    scope: _scope,
    parentBlueprint,
    _rootScope,
    isSVG,
    useGivenScope: true,
  });

  return blueprint as ElementBlueprint | ComponentBlueprint;
};

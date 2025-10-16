import { Blueprint } from "../../models/blueprint/Blueprint.model";
import { IRootScope } from "../../interfaces/IRootScope.interface";
import { INode } from "../../interfaces/INode.interface";
import { IMainScope } from "../../interfaces/IMainScope.interface";
import { TParentBlueprint } from "../../types/TParentBlueprint.type";
export declare const generateBlueprints: ({ nodes, scope, parentBlueprint, _rootScope, isSVG, useGivenScope, }: {
    nodes: Array<INode>;
    scope: IMainScope;
    parentBlueprint: TParentBlueprint | null;
    _rootScope: IRootScope;
    isSVG?: boolean | undefined;
    useGivenScope?: IMainScope | undefined;
}) => Array<Blueprint>;

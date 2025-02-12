import { Blueprint } from "../models/blueprint/Blueprint.model";
import { INode } from "../interfaces/INode.interface";
import { IProps } from "../interfaces/IProps.interface";
import { IMainScope } from "../interfaces/IMainScope.interface";
import { IRootScope } from "../interfaces/IRootScope.interface";
import { TParentBlueprint } from "./TParentBlueprint.type";
export type TGenerate = (options: {
    node: INode;
    orderedProps?: Array<string>;
    props?: IProps;
    scope: IMainScope;
    parentBlueprint: null | TParentBlueprint;
    _rootScope: IRootScope;
    isSVG: boolean;
    useGivenScope?: boolean;
}) => Blueprint;

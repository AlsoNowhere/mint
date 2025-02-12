import { Blueprint } from "../models/blueprint/Blueprint.model";
import { IMainScope } from "./IMainScope.interface";
export interface IScope extends IMainScope {
    _mintBlueprint?: Blueprint;
}

import { Store } from "../../../store/Store";
import { Blueprint } from "../../../models/blueprint/Blueprint.model";
import { IScope } from "../../../interfaces/IScope.interface";
export declare const externalRefresh: (target: IScope | Blueprint | Array<Blueprint> | Store) => void;

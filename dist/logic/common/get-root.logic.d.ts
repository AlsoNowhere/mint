import { Blueprint } from "../../models/blueprint/Blueprint.model";
export declare const getRootChildBlueprints: (blueprint: Blueprint) => Blueprint[];
export declare const getRootElement: (blueprint: Blueprint) => import("../../types/TElement.type").TElement;
export declare const getRootScope: (blueprint: Blueprint) => import("../../interfaces/IRootScope.interface").IRootScope;

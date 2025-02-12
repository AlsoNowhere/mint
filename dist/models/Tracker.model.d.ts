import { Blueprint } from "./blueprint/Blueprint.model";
type TBlueprint = Blueprint;
export declare class Tracker extends Array<TBlueprint> {
    addBlueprint: (blueprint: TBlueprint) => void;
    removeBlueprint: (blueprint: TBlueprint) => void;
    updating: (blueprint: TBlueprint) => boolean;
    constructor();
}
export {};

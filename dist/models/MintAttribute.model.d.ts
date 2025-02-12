import { Blueprint } from "./Blueprint.model";
import { MintElement } from "./MintElement.model";
import { TElement } from "../types/TElement.type";
import { TShouldExit } from "../types/TShouldExit.type";
import { TOrderedProperties } from "../types/TOrderedProperties.type";
import { IRootScope } from "../interfaces/IRootScope.interface";
type TonDefine = (parentBlueprint: null | Blueprint, orderedProperties: TOrderedProperties, mintElement: MintElement, rootScope: IRootScope) => TShouldExit;
type TonGenerate = (options: {
    htmlElement: TElement;
    parentBlueprint: null | Blueprint;
    orderedProperties: TOrderedProperties;
    mintElement: MintElement;
    rootScope: IRootScope;
    isSVG: boolean;
}) => TShouldExit;
type TonRender = (blueprint: Blueprint, parentElement: TElement, parentChildBlueprints: Array<Blueprint>, blueprintIndex: number) => TShouldExit;
type TonRefresh = (blueprint: Blueprint, parentElement: TElement, blueprintIndex: number, inserted: boolean) => TShouldExit;
export declare abstract class MintAttribute {
    constructor(cloneAttribute: any);
    cloneAttribute: () => MintAttribute;
    onDefine?: TonDefine;
    onGenerate?: TonGenerate;
    onRender?: TonRender;
    onRefresh?: TonRefresh;
}
export {};

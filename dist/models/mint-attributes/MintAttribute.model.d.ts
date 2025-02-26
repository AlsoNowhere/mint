import { TonRender } from "../../types/MintAttributes/TonRender.type";
import { TonGenerate } from "../../types/MintAttributes/TonGenerate.type";
import { TonRefresh } from "../../types/MintAttributes/TonRefresh.type";
export declare abstract class MintAttribute {
    constructor(cloneAttribute: any);
    cloneAttribute: (oldInstance?: MintAttribute) => MintAttribute;
    onGenerate?: TonGenerate;
    onRender?: TonRender;
    onRefresh?: TonRefresh;
}

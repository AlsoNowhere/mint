import { TMintContent } from "../types/TMintContent.type";
import { TRender } from "../types/TRender.type";
import { TRefresh } from "../types/TRefresh.type";
import { TGenerate } from "../types/TGenerate.type";
export declare class MintNode {
    content: Array<TMintContent>;
    generate: TGenerate;
    render: TRender;
    refresh: TRefresh;
    constructor(content: null | TMintContent | Array<TMintContent>, generate: TGenerate, render: TRender, refresh: TRefresh);
}

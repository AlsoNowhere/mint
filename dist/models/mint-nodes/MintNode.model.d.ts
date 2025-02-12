import { IProps } from "../../interfaces/IProps.interface";
import { INode } from "../../interfaces/INode.interface";
import { TRender } from "../../types/TRender.type";
import { TGenerate } from "../../types/TGenerate.type";
import { TRefresh } from "../../types/TRefresh.type";
import { TonRefresh } from "../../types/MintAttributes/TonRefresh.type";
export declare class MintNode {
    content: Array<INode>;
    props?: IProps;
    generate: TGenerate;
    render: TRender;
    refresh: TRefresh | TonRefresh;
    constructor(content: null | INode | Array<INode>, generate: TGenerate, render: TRender, refresh: TRefresh | TonRefresh);
}

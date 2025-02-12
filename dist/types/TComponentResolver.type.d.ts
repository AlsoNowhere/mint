import { MintComponent } from "../models/mint-nodes/MintComponent.model";
import { IProps } from "../interfaces/IProps.interface";
import { IMainScope } from "../interfaces/IMainScope.interface";
export type TComponentResovler = (orderedProps: Array<string>, props: IProps, mintComponent: MintComponent, parentScope: IMainScope) => void;

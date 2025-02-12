import { IScope } from "../interfaces/IScope.interface";
export type MintEvent<T extends HTMLElement = HTMLElement, U extends Object = {}> = (event: Event, element: T, scope: Object & IScope & U) => void;

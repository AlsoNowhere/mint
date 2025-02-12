import { IMainScope } from "../interfaces/IMainScope.interface";

export type TLifecycle = (arg?: { scope: IMainScope }) => void;

import { IAppOptions } from "../interfaces/IAppOptions.interface";
import { IMainScope } from "../interfaces/IMainScope.interface";
import { IApp } from "../interfaces/IApp.interface";
import { TRawContent } from "../types/TRawContent.type";
import { TElement } from "../types/TElement.type";
export declare const app: <T>(rootElement: TElement, baseRootScope: (IMainScope & T) | null, initialContent: TRawContent, { componentResolvers }?: IAppOptions) => IApp;

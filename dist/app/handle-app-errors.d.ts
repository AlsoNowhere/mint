import { IMainScope } from "../interfaces/IMainScope.interface";
import { TRawContent } from "../types/TRawContent.type";
import { TElement } from "../types/TElement.type";
export declare const handleAppErrors: <T>(rootElement: TElement, baseRootScope: (IMainScope & T) | null, initialContent: TRawContent) => void;

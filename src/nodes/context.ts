import { MintContext } from "../models/mint-nodes/MintContext.model";

import { TRawContent } from "../types/TRawContent.type";

export const context = (contexts: Record<string, string | Object>, content: TRawContent) => {
  return new MintContext(contexts, content);
};

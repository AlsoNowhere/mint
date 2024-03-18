import { Context } from "../models/Context.model";

import { TContext } from "../types/TContext.type";
import { TMintContent } from "../types/TMintContent.type";

export const context = (
  element: string,
  context: TContext,
  content: TMintContent | Array<TMintContent> = []
) => {
  return new Context(element, context, content);
};

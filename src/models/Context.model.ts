import { cloneContent } from "../services/cloneContent.service";

import { TContext } from "../types/TContext.type";
import { TMintContent } from "../types/TMintContent.type";

export class Context {
  element: string;
  context: TContext;
  content: TMintContent | Array<TMintContent>;

  constructor(
    element: string,
    context: TContext,
    content: TMintContent | Array<TMintContent>
  ) {
    this.element = element;
    this.context = context;
    this.content = content;
  }

  public clone() {
    return new Context(
      this.element,
      this.context,
      this.content instanceof Array
        ? this.content.map(cloneContent)
        : cloneContent(this.content)
    );
  }
}

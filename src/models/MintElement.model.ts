import { cloneAttributes } from "../services/cloneAttributes.service";
import { cloneContent } from "../services/cloneContent.service";

import { MintComponent } from "./MintComponent.model";

import { TMintContent } from "../types/TMintContent.type";

export class MintElement {
  element: string;
  component: MintComponent;
  attributes: Object;
  props: Object;
  content: Array<TMintContent>;
  constructor(
    element: string | MintComponent,
    attributesOrProps: null | Object = {},
    content: null | TMintContent | Array<TMintContent>
  ) {
    if (element instanceof MintComponent) {
      this.component = element;
      this.props = attributesOrProps ?? {};
    } else {
      this.element = element;
      this.attributes = attributesOrProps ?? {};
    }

    this.content =
      content instanceof Array ? content : content === null ? [] : [content];
  }

  public clone() {
    const element = this.element || this.component;
    if (element instanceof MintComponent) {
      element.mintElement = element.mintElement.clone();
    }
    return new MintElement(
      element,
      cloneAttributes(this),
      this.content instanceof Function
        ? this.content
        : this.content instanceof Array
        ? this.content.map((x) => cloneContent(x))
        : cloneContent(this.content)
    );
  }
}

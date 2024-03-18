import { element } from "../services/element.service";

import { MintTemplate } from "../models/MintTemplate.model";
import { Context } from "../models/Context.model";
import { MintElement } from "../models/MintElement.model";

import { TMintContent } from "../types/TMintContent.type";

const _element = (
  name: string,
  attributesOrContents?: {} | TMintContent | Array<TMintContent>,
  _content?: TMintContent | Array<TMintContent>
) => {
  if (attributesOrContents === undefined) {
    return element(name);
  }
  if (
    !(attributesOrContents instanceof MintTemplate) &&
    !(attributesOrContents instanceof Context) &&
    !(attributesOrContents instanceof MintElement) &&
    !(attributesOrContents instanceof Array) &&
    typeof attributesOrContents !== "string"
  ) {
    return element(name, attributesOrContents, _content);
  } else {
    return element(name, null, attributesOrContents);
  }
};

export const span = (a?: any, b?: any) => _element("span", a, b);
export const div = (a?: any, b?: any) => _element("div", a, b);

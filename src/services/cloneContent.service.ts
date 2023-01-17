import { TMintContent } from "../types/TMintContent.type";

export const cloneContent = (content: TMintContent): TMintContent => {
  if (typeof content === "string") return content;
  if (content instanceof Function) {
    return content;
  }
  return content.clone();
};

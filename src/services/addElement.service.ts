import { getWhereToInsert } from "./getWhereToInsert.service";

import { Template } from "../models/Template.model";
import { IF_Template } from "../models/IF_Template.model";
import { FOR_Template } from "../models/FOR_Template.model";

export const addElement = (
  element: HTMLElement | SVGElement,
  templates: Array<Template | IF_Template | FOR_Template>,
  rootElement: HTMLElement | SVGElement,
  templateIndex: number
) => {
  const elementToInsertBefore = getWhereToInsert(
    templates,
    rootElement,
    templateIndex
  );
  if (element === undefined) return;
  if (elementToInsertBefore !== undefined) {
    rootElement.insertBefore(element, elementToInsertBefore);
  } else {
    rootElement.appendChild(element);
  }
};

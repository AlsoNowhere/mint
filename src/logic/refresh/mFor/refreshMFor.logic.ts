import { recycleMForData } from "../../../services/recycleMForData.service";

import { addList } from "../../render/mFor/addList.logic";
import { generateForTemplates } from "../../template/mFor/generateForTemplates.logic";
import { refreshComponentTemplate } from "../refreshComponentTemplate.logic";
import { refreshElementTemplate } from "../refreshElementTemplate.logic";

import { IF_Template } from "../../../models/IF_Template.model";
import { Template } from "../../../models/Template.model";
import { MintElement } from "../../../models/MintElement.model";
import { FOR_Template } from "../../../models/FOR_Template.model";

import { IForData } from "../../../interfaces/IForData.interface";

export const refreshMFor = (
  template: FOR_Template,
  templates: Array<Template | IF_Template>,
  templateIndex: number
) => {
  const { mFor, parentTemplate, scope, isComponent } = template;
  if (mFor === undefined || parentTemplate === null) return;

  const { forKey, currentForRenders } = mFor;
  const { oldForDataLength } = mFor;
  const checkScope = isComponent ? parentTemplate.scope : scope;
  mFor.forData = (checkScope as any)[mFor.forValue];
  const newList = mFor.forData;

  /* Dev */
  // console.log("DEV === REFRESH === mFor: ", oldForDataLength, newList);

  if (newList === undefined) return;

  if (oldForDataLength !== newList.length) {
    const newCurrentForRenders: Array<Template | Object | string | number> = [];
    {
      let i = 0;
      while (i < newList.length) {
        const item = newList[i];
        const newCurrentRender = currentForRenders.find(({ scope }) => {
          const key = (scope as any)[forKey];
          return forKey === "_x" ? key === item : key === (item as any)[forKey];
        });
        newCurrentForRenders.push(newCurrentRender || item);
        i++;
      }
    }

    currentForRenders.forEach((currentRender) => {
      if (!newCurrentForRenders.includes(currentRender)) {
        const element = currentRender.isComponent
          ? currentRender.componentElement
          : currentRender.element;
        element?.parentElement?.removeChild(element);
      }
    });

    mFor.forData = [...newList];
    mFor.oldForDataLength = newList.length;

    const templateList = generateForTemplates(
      template.mintElement as MintElement,
      parentTemplate,
      checkScope,
      newCurrentForRenders,
      isComponent
    );

    mFor.currentForRenders = templateList;

    addList(
      templateList,
      templates,
      (parentTemplate.componentElement || parentTemplate.element) as
        | HTMLElement
        | SVGElement,
      templateIndex
    );
  }

  mFor.currentForRenders.forEach((x, i) =>
    recycleMForData(x.scope as IForData, newList[i], i)
  );

  mFor.currentForRenders.forEach((x) =>
    x.isComponent ? refreshComponentTemplate(x) : refreshElementTemplate(x)
  );
};

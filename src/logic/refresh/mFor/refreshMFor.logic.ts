import { recycleMForData } from "../../../services/recycleMForData.service";
import { checkUnique } from "../../../services/check-unique.service";

import { addList } from "../../render/mFor/addList.logic";
import { generateForTemplates } from "../../template/mFor/generateForTemplates.logic";
import { refreshComponentTemplate } from "../refreshComponentTemplate.logic";
import { refreshElementTemplate } from "../refreshElementTemplate.logic";
import { refreshTemplate } from "../refreshTemplate.logic";
import { matchElements } from "./match-elements.logic";

import { IF_Template } from "../../../models/IF_Template.model";
import { Template } from "../../../models/Template.model";
import { MintElement } from "../../../models/MintElement.model";
import { FOR_Template } from "../../../models/FOR_Template.model";

import { IForData } from "../../../interfaces/IForData.interface";

import { MINT_ERROR } from "../../../data/constants.data";

import { TElement } from "../../../types/TElement.type";

export const refreshMFor = (
  template: FOR_Template,
  templates: Array<Template | IF_Template>,
  templateIndex: number,
  { inserted }: { inserted: boolean }
) => {
  const { mFor, parentTemplate, scope, isComponent, isSVG } = template;
  if (mFor === undefined || parentTemplate === null) return;

  const { forKey, currentForRenders } = mFor;
  const { oldForDataLength } = mFor;
  const checkScope = isComponent ? parentTemplate.scope : scope;

  const _forData = (checkScope as any)[mFor.forValue];
  if (!(_forData instanceof Array) && _forData !== undefined) {
    throw new Error(`${MINT_ERROR} Must pass in an Array or undefined to mFor`);
  }
  const forData = [..._forData].filter(checkUnique(forKey));

  if (_forData.length !== forData.length) {
    console.warn(
      `mFor -- duplicate elements detected. Only one instance will be rendered. Check mKey value. ${forKey}`
    );
  }

  mFor.forData = forData;
  const newList = forData;
  mFor.oldForDataLength = newList.length;

  /* Dev */
  // console.log("DEV === REFRESH === mFor: ", oldForDataLength, newList);

  if (newList === undefined) return;

  if (oldForDataLength !== newList.length) {
    // ** New list
    const newCurrentForRenders: Array<Template | Object | string | number> = [];

    // ** Find if each new item already exists on current list of templates.
    // ** If not then add the scope only.
    {
      let i = 0;
      while (i < newList.length) {
        const item = newList[i];
        const newCurrentRender = currentForRenders.find(({ scope }) => {
          const value = (scope as any)[forKey];
          return forKey === "_x"
            ? value === item
            : value === (item as any)[forKey];
        });
        newCurrentForRenders.push(newCurrentRender || item);
        i++;
      }
    }

    // ** Cycle through old list and if its not only the new list then remove this element.
    currentForRenders.forEach((currentRender) => {
      if (!newCurrentForRenders.includes(currentRender)) {
        const element = currentRender.isComponent
          ? currentRender.componentElement
          : currentRender.element;
        element?.parentElement?.removeChild(element);
      }
    });

    const rendersList = newCurrentForRenders.map((x, i) => {
      if (x instanceof Template) {
        return x;
      }
      return generateForTemplates(
        template.mintElement as MintElement,
        parentTemplate,
        checkScope,
        [x],
        { isComponent, isSVG }
      )[0];
    });

    mFor.currentForRenders = rendersList;

    addList(
      rendersList,
      templates,
      (parentTemplate.componentElement || parentTemplate.element) as TElement,
      templateIndex
    );
  }

  if (mFor.mForType === "match") {
    const oldList = [...mFor.currentForRenders];
    matchElements(mFor.currentForRenders, oldList, newList, forKey);
    mFor.currentForRenders.forEach(({ scope }, i) =>
      recycleMForData(scope as IForData, newList[i], i)
    );
  } else {
    mFor.currentForRenders.forEach(({ scope }, i) =>
      recycleMForData(scope as IForData, newList[i], i)
    );
  }

  mFor.currentForRenders.forEach((x) => {
    const { isComponent, templates } = x;
    const _i = { inserted };
    isComponent
      ? refreshComponentTemplate(x, _i)
      : refreshElementTemplate(x, _i);
    templates.forEach((y, i) => {
      const pt = y.parentTemplate;
      const type = pt?.componentElement || pt?.element;
      refreshTemplate(type as TElement, y, templates, i, _i);
    });
  });
};

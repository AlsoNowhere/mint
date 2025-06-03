import { generateBlueprints } from "../generate-blueprints.logic";

import { Blueprint } from "../../../models/blueprint/Blueprint.model";
import { ComponentBlueprint } from "../../../models/blueprint/ComponentBlueprint.model";
import { TextBlueprint } from "../../../models/blueprint/TextBlueprint.model";

import { INode } from "../../../interfaces/INode.interface";

import { TParentBlueprint } from "../../../types/TParentBlueprint.type";

// ** This function gets the content that should be used to replace "_children".
// ** It works by having the content saved when the Component is used in an element().
// ** This is then replaced with cloned content from the Component definition.
// ** This saved content can then be used to replace "_children" where it it defined.

const getContent = (blueprint: ComponentBlueprint): undefined | Array<INode> => {
  const { parentBlueprint, _childrenContent } = blueprint;

  // ** If the content is valid then return this.
  if (_childrenContent !== undefined) return _childrenContent;

  // ** If the parent does not have valid content then pass undefined, which will be ignored to prevent errors.
  if (parentBlueprint === null) return;

  // ** We cycle back through until we get valid content.
  return getContent(parentBlueprint as ComponentBlueprint);
};

export const resolveChildBlueprints = (
  blueprint: Blueprint,
  childBlueprints: Array<Blueprint>,
  isSVG: boolean
): Array<Blueprint> => {
  const { scope, _rootScope } = blueprint;
  let childrenContent: undefined | Array<INode>;

  // ** Here we get the content that should be used to replace "_children".
  // ** This is pre Blueprint generated rated.
  childrenContent = getContent(blueprint as ComponentBlueprint);

  if (childrenContent !== undefined) {
    // ** If this is the keyword "_children" then replace this with childrenContent.
    // ** As these are blueprints then they will need to be cloned and unique at the render phase.
    for (let [i, item] of childBlueprints.entries()) {
      if (item instanceof TextBlueprint && item.textValue === "_children") {
        // ** This is IMPORTANT.
        // ** We need to remove "_children" before generating Blueprints otherwise we'll get into
        // ** an infinite loop.
        childBlueprints.splice(i, 1);

        // ** Now we can generate the Blueprints.
        const _children = generateBlueprints({
          nodes: childrenContent,
          scope,
          parentBlueprint: blueprint as TParentBlueprint,
          _rootScope,
          isSVG
        });

        // ** Now we insert the Blueprints, replacing "_children".
        childBlueprints.splice(i, 0, ..._children);
      }
    }
  }

  return childBlueprints as Array<Blueprint>;
};

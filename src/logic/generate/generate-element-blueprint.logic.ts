import { resolveChildBlueprints } from "./generate-common/resolve-child-blueprints.logic";
import { generateBlueprints } from "./generate-blueprints.logic";
import { checkForErrorsOnBlueprint } from "./generate-common/check-for-errors-on-blueprint.logic";
import { resolveMAttributesOnGenerate } from "../resolve-m-attributes/on-generate.logic";

import { Blueprint } from "../../models/blueprint/Blueprint.model";
import { ElementBlueprint } from "../../models/blueprint/ElementBlueprint.model";
import { MintElement } from "../../models/mint-nodes/MintElement.model";

import { TGenerate } from "../../types/TGenerate.type";
import { TElement } from "../../types/TElement.type";

import { _DevLogger_ } from "../../_DEV_/_DevLogger_";

export const generateElementBlueprint: TGenerate = ({
  node,
  orderedProps: orderedAttributes,
  props: attributes,
  scope,
  parentBlueprint,
  _rootScope,
  isSVG,
}) => {
  // ** This Function can only be accessed  by MintElement so tell TS that here.
  const mintElement = node.mintNode as MintElement;

  const { element, content } = mintElement;

  // ** We to check for SVG, which we do here.
  // ** Child Elements of SVG are all SVG Elements as well so it stays true from here downwards.
  element === "svg" && (isSVG = true);

  let newHTMLElement: undefined | TElement = undefined;

  // ** Check for Fragments.
  if (element !== undefined && element !== "<>") {
    // ** Create the new Element in JS
    // ** SVG Elements are slightly different and are created differently here.
    newHTMLElement = isSVG
      ? // ** An SVGElement is different to a HTMLElement, it is older and needs a different method to be created.
        document.createElementNS("http://www.w3.org/2000/svg", element)
      : // ** Create a new HTMLElment.
        document.createElement(element);
  }

  {
    // ** Here we resolve the attributes of the element.
    // ** If one of the mAttributes on the list means we stop generating here then detect that.
    const shouldReturn = resolveMAttributesOnGenerate({
      orderedProps: orderedAttributes ?? [],
      props: attributes ?? {},
      htmlElement: newHTMLElement,
      node,
      parentScope: scope,
      scope,
      parentBlueprint,
      _rootScope,
      isSVG,
      isComponent: false,
      isAttribute: true,
    });
    if (shouldReturn.condition) {
      return shouldReturn.value as Blueprint;
    }
  }

  const blueprint = new ElementBlueprint({
    mintNode: mintElement,
    fragment: element === "<>" || undefined,
    element: newHTMLElement,
    orderedAttributes: orderedAttributes ?? [],
    attributes: attributes ?? {},
    scope,
    parentBlueprint,
    _rootScope,
  });

  /* Dev */
  // _DevLogger_("GENERATE", "ELEMENT", blueprint, parentBlueprint);

  const _childBlueprints: Array<Blueprint> = [];

  // ** Here we produce the content of the children of this Element.
  if (content !== undefined) {
    _childBlueprints.push(
      ...generateBlueprints({
        nodes: content,
        scope,
        parentBlueprint: blueprint,
        _rootScope,
        isSVG,
      })
    );
  }

  // ** Check if the children content contains the "_children" keyword.
  // ** Using this allows the content of this child blueprint to use custom content passed into this parent Component.
  // ** E.g
  /*
    const Sub = component("div", null, null, "_children");
    const Main = component("main", null, null, element(Sub, null, "Content"));

    Produces:

    <main>
      <div>Content</div>
    </main>
  */
  const childBlueprints = resolveChildBlueprints(
    blueprint,
    _childBlueprints,
    isSVG
  );

  if (element === "<>") {
    blueprint.collection = childBlueprints;
  } else {
    blueprint.childBlueprints = childBlueprints;
  }

  checkForErrorsOnBlueprint(blueprint);

  return blueprint;
};

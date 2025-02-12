import { cloneProps } from "../../services/clone-props.service";
import { resolvePropsOrder } from "../../services/resolve-props-order.service";

import { cloneContent } from "../common/clone-content.logic";
import { applyScopeTransformers } from "../common/apply-scope-transformers.logic";
import { resolveChildBlueprints } from "./generate-common/resolve-child-blueprints.logic";
import { generateBlueprints } from "./generate-blueprints.logic";
import { assignProps } from "../common/assign-props.logic";
import { checkForErrorsOnBlueprint } from "./generate-common/check-for-errors-on-blueprint.logic";
import { resolveMAttributesOnGenerate } from "../resolve-m-attributes/on-generate.logic";
import { fixProps } from "./generate-common/fix-props.logic";

import { Blueprint } from "../../models/blueprint/Blueprint.model";
import { MintScope } from "../../models/MintScope.model";
import { MintComponent } from "../../models/mint-nodes/MintComponent.model";
import { ComponentBlueprint } from "../../models/blueprint/ComponentBlueprint.model";

import { IScope } from "../../interfaces/IScope.interface";
import { INode } from "../../interfaces/INode.interface";
import { IAttributes } from "../../interfaces/IAttributes.interface";

import { MINT_ERROR } from "../../data/constants.data";

import { TGenerate } from "../../types/TGenerate.type";
import { TElement } from "../../types/TElement.type";

import { _DevLogger_ } from "../../_DEV_/_DevLogger_";

export const generateComponentBlueprint: TGenerate = ({
  node,
  orderedProps,
  props,
  scope: parentScope,
  parentBlueprint,
  _rootScope,
  isSVG,
  useGivenScope,
}) => {
  const { mintNode, content: _children } = node;
  fixProps((mintNode as MintComponent).attributes);
  const mintComponent = mintNode as MintComponent;
  const { element, content } = mintComponent;
  const attributes: IAttributes = cloneProps({
    props: mintComponent.attributes,
  });

  const orderedAttributes = resolvePropsOrder(attributes);

  // <@ REMOVE FOR PRODUCTION
  if (
    !(mintComponent.scope instanceof Function) &&
    mintComponent.scope !== null
  ) {
    throw new Error(
      `${MINT_ERROR} Mint Component -- scope -- must pass a constructor function for Component scope argument (second argument) i.e component("div", function(){}`
    );
  }
  // @>

  element === "svg" && (isSVG = true);

  // <@ REMOVE FOR PRODUCTION
  if (element !== "<>" && (element?.includes("<") || element?.includes(">"))) {
    throw new Error(
      `${MINT_ERROR} Element sent to node() contains angle brackets "${element}". Use "${element.substring(
        1,
        element.length - 2
      )}" instead.`
    );
  }
  // @>

  // ** Generate new HTMLElement.
  // ** If this is a Fragment then a new Element won't be defined.
  let newHTMLElement: undefined | TElement = undefined;
  if (element !== undefined && element !== "<>") {
    newHTMLElement =
      element === "svg" || isSVG
        ? document.createElementNS("http://www.w3.org/2000/svg", element)
        : document.createElement(element);
  }

  // ** Create the new Component's scope.
  let componentScope: IScope;
  if (useGivenScope) {
    // ** When mFor is looped over a Component an extra layer of scope is added.
    // ** In order to get the original Component we must do it manually here.
    componentScope = parentScope as IScope;
  } else {
    componentScope = new (mintComponent.scope ?? MintScope)();
    // ** Certain props are ScopeTransformer objects and apply their values differently
    // ** to the Component.
    // ** We handle that here.
    applyScopeTransformers(componentScope);
  }

  // ** Here we check for app level Component Resolvers.
  // ** These are things that are run against the Component.
  // ** For example generating prop types checks.
  if (!!_rootScope.componentResolvers) {
    for (let componentResolver of _rootScope.componentResolvers) {
      componentResolver(
        orderedProps ?? [],
        props ?? {},
        mintComponent,
        parentScope
      );
    }
  }

  // ** When a Component is defined, props are provided to it.
  // ** Here we take those props and assign their values from the parent scope to this Component.
  assignProps(componentScope, orderedProps ?? [], props ?? {}, parentScope);

  const commonValues = {
    node,
    htmlElement: newHTMLElement,
    parentScope,
    scope: componentScope,
    parentBlueprint,
    _rootScope,
    isSVG,
    isComponent: true,
  };

  {
    // ** Here we resolve the props of the Component.
    // ** If one of the mAttributes on the list means we stop generating here then detect that.
    const shouldReturn = resolveMAttributesOnGenerate({
      orderedProps: orderedProps ?? [],
      props: props ?? {},
      isAttribute: false,
      ...commonValues,
    });
    if (shouldReturn.condition) {
      return shouldReturn.value as Blueprint;
    }
  }

  {
    // ** Here we resolve the attributes of the Component.
    // ** If one of the mAttributes on the list means we stop generating here then detect that.
    const shouldReturn = resolveMAttributesOnGenerate({
      orderedProps: orderedAttributes,
      props: attributes,
      isAttribute: true,
      ...commonValues,
    });
    if (shouldReturn.condition) {
      return shouldReturn.value as Blueprint;
    }
  }

  // ** LIFECYCLE CALL
  componentScope.onpreblueprint?.();

  // ** We define the content that might be used to populate the "_children" keyword inside
  // ** the Component.

  const blueprint = new ComponentBlueprint({
    mintNode: mintComponent,
    fragment: element === "<>" || undefined,
    element: newHTMLElement,
    orderedProps: orderedProps ?? [],
    props: props ?? {},
    orderedAttributes,
    attributes,
    scope: componentScope,
    parentBlueprint,
    _rootScope,
  });

  if (!!_children) {
    blueprint.contentFor_children = [];
    for (let x of _children) {
      blueprint.contentFor_children.push(cloneContent(x));
    }
  }

  componentScope._mintBlueprint = blueprint as Blueprint;

  /* Dev */
  // _DevLogger_("GENERATE", "COMPONENT", blueprint, parentBlueprint);

  // ** Clone the content so that each Component has unique content from the original definition.
  const _content: Array<INode> = [];
  for (let x of content) {
    _content.push(cloneContent(x));
  }

  const _childBlueprints = generateBlueprints({
    nodes: _content,
    scope: componentScope,
    parentBlueprint: blueprint,
    _rootScope,
    isSVG,
  });

  // ===
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
  //  ===
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

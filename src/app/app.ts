import { handleAppErrors } from "./handle-app-errors";

import { generateBlueprints } from "../logic/generate/generate-blueprints.logic";
import { createMintText } from "../logic/common/create-mint-text.logic";
import { currentlyTracking } from "../logic/common/currently-tracking.logic";
import { renderBlueprints } from "../logic/render/render-blueprints.logic";

import { IRootScope } from "../interfaces/IRootScope.interface";
import { IAppOptions } from "../interfaces/IAppOptions.interface";
import { INode } from "../interfaces/INode.interface";
import { IMainScope } from "../interfaces/IMainScope.interface";
import { IApp } from "../interfaces/IApp.interface";

import { MINT_ERROR } from "../data/constants.data";

import { TRawContent } from "../types/TRawContent.type";
import { TElement } from "../types/TElement.type";

import { _DevLogger_ } from "../_DEV_/_DevLogger_";

// ** Root of the application.
// ** There can be more than one application in a project.
export const app = <T>(
  rootElement: TElement,
  baseRootScope: (IMainScope & T) | null,
  initialContent: TRawContent,
  { componentResolvers }: IAppOptions = { componentResolvers: [] }
): IApp => {
  // <@ REMOVE FOR PRODUCTION
  handleAppErrors<T>(rootElement, baseRootScope, initialContent);
  // @>

  const rootScope: IRootScope = {
    ...baseRootScope,
    _isRootScope: true,
    _rootElement: rootElement,
    _rootChildBlueprints: [],
    componentResolvers,
  };

  // ** LIFECYCLE CALL
  // ** This one runs before the blueprints are made, but after the data is defined.
  rootScope.onpreblueprint?.({ scope: rootScope });

  // ** Create the app content that will be added to the root element.
  const content: Array<INode> = createMintText(initialContent);

  // ** Generate the blueprints.
  const blueprints = generateBlueprints({
    nodes: content,
    scope: rootScope,
    parentBlueprint: null,
    _rootScope: rootScope,
    isSVG: false,
  });

  /* Dev */
  // _DevLogger_("APP", "BLUEPRINTS", blueprints);

  // ** Save a reference to the blueprints that are at the root element (App) level to the rootScope.
  rootScope._rootChildBlueprints = blueprints;

  // ** LIFECYCLE CALL
  // ** This is called only once.
  rootScope.oninit?.({ scope: rootScope });

  // ** Render the blueprints with a tracker.
  // ** We detect if one of the renders tries to trigger a refresh, which is not allowed.
  // {

  for (let [index, blueprint] of blueprints.entries()) {
    // <@ REMOVE FOR PRODUCTION
    // ** If render or refresh is called on a blueprint that is currently rendering or refreshing then its an error.
    if (currentlyTracking.updating(blueprint))
      throw new Error(
        `${MINT_ERROR} Render was run on blueprint that was already rendering.`
      );
    currentlyTracking.addBlueprint(blueprint);
    // @>

    renderBlueprints([blueprint], rootElement, blueprints, [index]);

    // <@ REMOVE FOR PRODUCTION
    currentlyTracking.removeBlueprint(blueprint);
    // @>
  }

  // ** Here we define and return a function that can remove a created app.
  return { rootElement, scope: blueprints, rootScope };
};

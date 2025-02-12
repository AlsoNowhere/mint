import { Blueprint } from "../../models/Blueprint.model";
import { MintElement } from "../../models/MintElement.model";
import { MintText } from "../../models/MintText.model";
import { IScope } from "../../interfaces/IScope.interface";
import { IBlueprintExtensions } from "../../interfaces/IBlueprintExtensions.interface";
export declare const generateBlueprint: (mintElement: MintText | MintElement, parentBlueprint: null | Blueprint, parentScope: IScope, { rootScope, isSVG, useParentScope }: IBlueprintExtensions) => Blueprint;

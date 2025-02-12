import { ComponentBlueprint } from "../models/blueprint/ComponentBlueprint.model";
import { ElementBlueprint } from "../models/blueprint/ElementBlueprint.model";
import { ForBlueprint } from "../models/blueprint/ForBlueprint.model";
import { TemplateBlueprint } from "../models/blueprint/TemplateBlueprint.model";

export type TParentBlueprint =
  | ComponentBlueprint
  | ElementBlueprint
  | ForBlueprint
  | TemplateBlueprint;

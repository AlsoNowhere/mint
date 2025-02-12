import { Blueprint } from "./blueprint/Blueprint.model";

type TBlueprint = Blueprint;

const hasUpdatingBlueprint = (
  blueprintToCheck: TBlueprint,
  blueprints: Array<Blueprint>
) => {
  if (blueprints.includes(blueprintToCheck)) {
    return true;
  }
  let beingUpdated = false;
  for (let item of blueprints) {
    if (!!item.childBlueprints) {
      beingUpdated = hasUpdatingBlueprint(
        blueprintToCheck,
        item.childBlueprints
      );
    }
    if (beingUpdated === true) break;
  }
  return beingUpdated;
};

export class Tracker extends Array<TBlueprint> {
  addBlueprint: (blueprint: TBlueprint) => void;
  removeBlueprint: (blueprint: TBlueprint) => void;
  updating: (blueprint: TBlueprint) => boolean;

  constructor() {
    super();

    this.addBlueprint = function (blueprint: TBlueprint) {
      this.push(blueprint);
    };

    this.removeBlueprint = function (blueprint: TBlueprint) {
      const index = this.indexOf(blueprint);
      this.splice(index, 1);
    };

    this.updating = function (blueprint: TBlueprint) {
      return hasUpdatingBlueprint(blueprint, this);
    };
  }
}

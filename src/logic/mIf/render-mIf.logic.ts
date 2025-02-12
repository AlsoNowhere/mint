import { Blueprint } from "../../models/blueprint/Blueprint.model";

import { I_mIf } from "../../interfaces/I_mIf.interface";

export const renderMIf = (blueprint: Blueprint, mIf: I_mIf) => {
  if (blueprint === null) return { condition: false, value: undefined };

  if (mIf.blueprinted === false && mIf.state === false) {
    return { condition: true, value: blueprint };
  }

  return { condition: false, value: undefined };
};

import {
  I_mTemplate,
  I_mTemplate_Options,
} from "../interfaces/I_mTemplate.interface";

export class MintTemplate implements I_mTemplate {
  target: string;
  refreshOnEach: boolean;
  replaceCondition: I_mTemplate_Options["replaceCondition"];

  constructor(
    target: string,
    { refreshOnEach, replaceCondition }: I_mTemplate_Options
  ) {
    this.target = target;
    this.refreshOnEach = refreshOnEach ?? true;
    this.replaceCondition = replaceCondition;
  }

  public clone() {
    const { refreshOnEach, replaceCondition } = this;
    return new MintTemplate(this.target, { refreshOnEach, replaceCondition });
  }
}

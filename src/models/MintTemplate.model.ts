export class MintTemplate {
  target: string;
  refreshOnEach: boolean;

  constructor(target: string, refreshOnEach = true) {
    this.target = target;
    this.refreshOnEach = refreshOnEach;
  }

  public clone() {
    return new MintTemplate(this.target, this.refreshOnEach);
  }
}

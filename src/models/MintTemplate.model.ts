export class MintTemplate {
  target: string;

  constructor(target: string) {
    this.target = target;
  }

  public clone() {
    return new MintTemplate(this.target);
  }
}

export class UpwardRef<T = SVGElement | HTMLElement> {
  ref: T | null;

  constructor(ref: T | null = null) {
    this.ref = ref;
  }
}
